import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { getProducts } from '../actions/productActions'

const HomeScreen = ({ loading, error, products, getProducts }) => {
	console.log(products)

	useEffect(() => {
		getProducts()
	}, [])

	return (
		<Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<h2>Loading...</h2>
			) : error ? (
				<h3>{error}</h3>
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

const mapStateToProps = (state) => {
	return {
		loading: state.productList.loading,
		error: state.productList.error,
		products: state.productList.products,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: () => dispatch(getProducts()),
	}
}

const ConnectedHomeScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen)

export default ConnectedHomeScreen
