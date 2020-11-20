import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductDetails, createReview } from '../actions/productActions'

//#! Explanation about the array iterator below component

const ProductScreen = ({ match, history }) => {
	const productID = match.params.id

	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	// Details of product
	const productDetails = useSelector((state) => {
		return state.productDetails
	})
	const { loading, error, product } = productDetails

	// Logged in user info
	const userLogin = useSelector((state) => {
		return state.userLogin
	})
	const { userInfo } = userLogin

	// Product review reducer
	const productCreateReview = useSelector((state) => {
		return state.productCreateReview
	})
	const {
		error: errorProductReview,
		success: successProductReview,
	} = productCreateReview

	// Pull id from URL and search for that product
	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted')
			setRating(0)
			setComment('')
			dispatch({
				type: 'PRODUCT_CREATE_REVIEW_RESET',
			})
		}
		dispatch(getProductDetails(productID))
	}, [dispatch, match, successProductReview])

	// Could also add to cart here imo
	const addToCart = () => {
		history.push(`/cart/${productID}?qty=${qty}`)
	}

	const addReview = (e) => {
		e.preventDefault()
		dispatch(createReview(productID, { rating, comment }))
	}

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
				<Fragment>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid></Image>
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${
											product.numReviews === 1
												? `${product.numReviews} review`
												: `${product.numReviews} reviews`
										}`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
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
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
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
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCart}
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
										>
											Add to cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => {
									return (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} />
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									)
								})}
								<ListGroup.Item>
									<h2>Write a review</h2>
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={addReview}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => {
														setRating(e.target.value)
													}}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Great</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => {
														setComment(e.target.value)
													}}
												></Form.Control>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											<Link to='/login'>Log in</Link> to leave a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</Fragment>
			)}
		</Fragment>
	)
}

// //// The goal of this is to create an option component for the total amount of numbers in countInStock (6 options made if the stock has 6)

// 	1. We will hold the values in an array with [], so we can use the array.map method for returning an option each time
//  2. We create a new array with Array constructor method
//  3. Passing an argument (needs to be integer between 0 - 232) to the Array will make room for X amount, here it's that many in stock
//  4. We spread out the array (spreading all the individual arguments/elements out)
//  5. Since there is now only room in the array but no elements, you'll get [undefined] times how much room you made
//  6. We use .keys() to populate the array with the indexes of the array, so undefined at the first index (0) becomes 0
// 	7. Now we map over these elements and return an option for each one
//     where the value is equal to that index but with +1 to account for indexes starting at 0 (if there were 0 we would show Out of Stock not 0)

// {[...Array(details.countInStock).keys()].map((x) => (
// 	<option key={x + 1} value={x + 1}>
// 		{x + 1}
// 	</option>
// ))}

// Don't know why this is different
// if (details) {
// 	// Gives rangeError: invalid length
// 	let notWorkingArray = []
// 	notWorkingArray.length = details.countInStock

// 	// Does give the array a length set to the count in stock
// 	let workingArray = Array(details.countInStock)
// 	console.log(workingArray)
// }

export default ProductScreen
