import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductDetails } from '../actions/productActions'

//#! Explanation about the array iterator below component

const ProductScreen = ({ match }) => {
	const [qty, setQty] = useState(0)

	const dispatch = useDispatch()
	const productDetails = useSelector((state) => {
		return state.productDetails
	})

	const { loading, error, details } = productDetails

	// Pull id from URL and search for that product
	useEffect(() => {
		dispatch(getProductDetails(match.params.id))
	}, [dispatch, match])

	return (
		<Fragment>
			<Link to='/' className='btn btn-dark my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={details.image} alt={details.name} fluid></Image>
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{details.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={details.rating}
									text={`${details.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${details.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {details.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${details.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{details.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{details.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => {
														setQty(e.target.value)
													}}
												>
													{[...Array(details.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
													{console.log([Array(details.countInStock)])}
													{console.log([...Array(details.countInStock)])}
													{console.log([...Array(details.countInStock).keys()])}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										disabled={details.countInStock === 0}
									>
										Add to cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	)
}

////// The goal of this is to create an option component for the total amount of numbers in countInStock (6 options made if the stock has 6)

// 	1. We will hold the values in an array with [], so we can use the array.map method for returning an option each time
//  2. We create a new array with Array constructor method
//  3. Passing an argument (needs to be integer between 0 - 232) to the Array will make room for X amount, here it's that many in stock
//  4. We spread out the array (spreading all the individual arguments/elements out)
//  5. Since there is now only room in the array but no elements, you'll get [undefined] times how much room you made
//  6. We use .keys() to populate the array with the indexes of the array, so undefined at the first index (0) becomes 0
//	7. Now we map over these elements and return an option for each one
//     where the value is equal to that index but with +1 to account for indexes starting at 0 (if there were 0 we would show Out of Stock not 0)

// {[...Array(details.countInStock).keys()].map((x) => (
// 	<option key={x + 1} value={x + 1}>
// 		{x + 1}
// 	</option>
// ))}

export default ProductScreen
