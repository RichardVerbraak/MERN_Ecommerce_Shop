import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { getProducts } from '../actions/productActions'

// Alternative way with hooks instead of using wrapping in a connect function with mapStateToProps etc.
const HomeScreen = ({ match }) => {
	const searchQuery = match.params.keyword

	const dispatch = useDispatch()
	const productList = useSelector((state) => {
		return state.productList
	})
	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(getProducts(searchQuery))
	}, [dispatch, searchQuery])

	return (
		<Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={'danger'}>{error}</Message>
			) : (
				<Row>
					{products.map((product) => {
						return (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						)
					})}
				</Row>
			)}
		</Fragment>
	)
}

// const mapStateToProps = (state) => {
// 	return {
// 		loading: state.productList.loading,
// 		error: state.productList.error,
// 		products: state.productList.products,
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getProducts: () => dispatch(getProducts()),
// 	}
// }

// const ConnectedHomeScreen = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(HomeScreen)

export default HomeScreen
