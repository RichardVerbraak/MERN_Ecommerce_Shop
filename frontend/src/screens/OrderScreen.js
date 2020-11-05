import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
	const orderID = match.params.id

	const orderDetailsReducer = useSelector((state) => {
		return state.orderDetails
	})
	const { orderDetails, loading, error } = orderDetailsReducer

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getOrderDetails(orderID))
		// eslint-disable-next-line
	}, [dispatch, history])

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Fragment>
					<h1>Order {orderDetails._id}</h1>
					<Row>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Address: </strong>
										{orderDetails.shippingAddress.address},{' '}
										{orderDetails.shippingAddress.city}.{' '}
										{orderDetails.shippingAddress.city}{' '}
										{orderDetails.shippingAddress.postalCode},{' '}
										{orderDetails.shippingAddress.country}
									</p>
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<strong>Method: </strong>
									{orderDetails.paymentMethod}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>
									{orderDetails.orderItems.length === 0 ? (
										<Message>Order is empty</Message>
									) : (
										<ListGroup variant='flush'>
											{orderDetails.orderItems.map((item, index) => {
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
											<Col>${orderDetails.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${orderDetails.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${orderDetails.taxPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${orderDetails.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
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
