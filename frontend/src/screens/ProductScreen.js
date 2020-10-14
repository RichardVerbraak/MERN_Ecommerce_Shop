import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getDetails } from '../actions/productActions'

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch()
	const productDetails = useSelector((state) => {
		return state.productDetails
	})

	console.log(productDetails)

	const { loading, error, details } = productDetails

	useEffect(() => {
		dispatch(getDetails(match.params.id))
	}, [dispatch])

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

export default ProductScreen
