import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetails,
	payOrder,
	orderPayReset,
	orderDeliverReset,
} from '../actions/orderActions'

const OrderScreen = ({ match }) => {
	const [sdkReady, setSdkReady] = useState(false)

	const orderID = match.params.id

	const orderDetailsReducer = useSelector((state) => {
		return state.orderDetails
	})
	const { order, loading, error } = orderDetailsReducer

	const orderPayReducer = useSelector((state) => {
		return state.orderPay
	})
	const { loading: loadingPay, success: successPay } = orderPayReducer

	const orderDeliverReducer = useSelector((state) => {
		return state.orderDeliver
	})
	const {
		loading: loadingDeliver,
		success: successDeliver,
	} = orderDeliverReducer

	const dispatch = useDispatch()

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: payPalID } = await axios.get('/api/config/paypal')
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://www.paypal.com/sdk/js?client-id=${payPalID}`
			script.async = true

			// onload is executed the when the page has been fully loaded
			script.onload = () => {
				setSdkReady(true)
			}
			document.body.appendChild(script)
		}

		// IFFE (Immediatly Invoked Function Expression)
		// In plain terms, a function that will execute immediatly without being called (due to the brackets at the end)
		// It needs a semicolon at the start so it prevents previous code getting in the way
		// ;(async function () {
		// 	const { data: payPalID } = await axios.get('/api/config/paypal')
		// 	const script = document.createElement('script')
		// 	script.type = 'text/javascript'
		// 	script.async = true
		// 	script.src = `https://paypal.com/sdk/js?client-id=${payPalID}`

		// 	script.onload = () => {
		// 		setSdkReady(true)
		// 	}
		// 	document.body.appendChild(script)
		// })()

		// Double check to see if there is an order and if it matches the one in the URL
		if (!order || order._id !== orderID || successPay || successDeliver) {
			dispatch(orderPayReset())
			dispatch(orderDeliverReset())
			dispatch(getOrderDetails(orderID))
			// If it isn't paid it will append the paypal script to the page, if it is it will set the state to true (script ready)
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript()
			} else {
				setSdkReady(true)
			}
		}
	}, [dispatch, order, orderID, successPay])

	// When the payment goes through from the paypal button package, this will fire off with the result of the payment and the orderID itself
	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult)
		dispatch(payOrder(orderID, paymentResult))
	}

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Fragment>
					<h1>Order {order._id}</h1>
					<Row>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Name: </strong>
										{order.user.name}
									</p>

									<p>
										<strong>Email: </strong>
										<a href={`mailto:${order.user.email}`}>
											{' '}
											{order.user.email}
										</a>
									</p>
									<p>
										<strong>Address: </strong>
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city}. {order.shippingAddress.city}{' '}
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>
									{order.isDelivered ? (
										<Message variant='success'>
											Delivered on {order.deliveredAt}
										</Message>
									) : (
										<Message variant='danger'>Not delivered</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<strong>Method: </strong>
										{order.paymentMethod}
									</p>
									{order.isPaid ? (
										<Message variant='success'>Paid on {order.paidAt}</Message>
									) : (
										<Message variant='danger'>Not paid</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>
									{order.orderItems.length === 0 ? (
										<Message>Order is empty</Message>
									) : (
										<ListGroup variant='flush'>
											{order.orderItems.map((item, index) => {
												return (
													<ListGroup.Item key={index}>
														<Row>
															<Col md={1}>
																<Image
																	src={item.image}
																	alt={item.name}
																	fluid
																	rounded
																/>
															</Col>
															<Col>
																<Link to={`/product/${item.product}`}>
																	{item.name}
																</Link>
															</Col>
															<Col md={4}>
																{item.qty} x ${item.price} = $
																{item.qty * item.price}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											})}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Items</Col>
											<Col>${order.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${order.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${order.taxPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
									{!order.isPaid && (
										<ListGroup.Item>
											{loadingPay && <Loader />}
											{!sdkReady ? (
												<Loader />
											) : (
												<PayPalButton
													amount={order.totalPrice}
													onSuccess={successPaymentHandler}
												/>
											)}
										</ListGroup.Item>
									)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</Fragment>
			)}
		</Fragment>
	)
}

export default OrderScreen
