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
	const { order, loading, error } = orderDetailsReducer

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getOrderDetails(orderID))
	}, [])

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
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<strong>Method: </strong>
									{order.paymentMethod}
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
