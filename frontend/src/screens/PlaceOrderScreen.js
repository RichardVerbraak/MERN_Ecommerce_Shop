import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
	const cart = useSelector((state) => {
		return state.cart
	})
	const { cartItems, shippingAddress, paymentMethod } = cart

	const orderCreate = useSelector((state) => {
		return state.orderCreate
	})
	const { order, success, error } = orderCreate

	const dispatch = useDispatch()

	// Success value never changes back to false, so you'd always instantly get redirected to the order screen and not placeOrder
	// I fixed this by resetting the success value to false and which gets set to true when createOrder is fired off (place order button)
	useEffect(() => {
		dispatch({
			type: 'ORDER_CREATE_RESET_SUCCESS',
		})

		if (success) {
			history.push(`/order/${order._id}`)
		}
		// eslint-disable-next-line
	}, [history, success])

	//////// Calculate prices
	// Brad uses this to add decimals to his numbers
	// eslint-disable-next-line
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	// Prices of items
	cart.itemsPrice = cartItems.reduce((accumulator, item) => {
		return accumulator + item.price * item.qty
	}, 0)

	// Shipping Price
	cart.shippingPrice =
		cart.itemsPrice > Number(100).toFixed(2)
			? Number(0).toFixed(2)
			: Number(10).toFixed(2)

	// Tax price
	cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2)

	// Price total
	cart.totalPrice =
		Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

	const placeOrder = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}

	return (
		<Fragment>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{shippingAddress.address}, {shippingAddress.city}.{' '}
								{shippingAddress.city} {shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => {
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
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cartItems === 0}
									onClick={placeOrder}
								>
									Place order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	)
}

export default PlaceOrderScreen
