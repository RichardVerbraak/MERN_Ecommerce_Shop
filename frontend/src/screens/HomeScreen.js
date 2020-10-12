import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
	const [products, setProducts] = useState([])

	// I'd normally use fetch API but this also works
	useEffect(() => {
		const getData = async () => {
			const res = await axios.get('/api/products')
			setProducts(res.data)
		}
		getData()
	}, [])

	return (
		<Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => {
					return (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					)
				})}
			</Row>
		</Fragment>
	)
}

export default HomeScreen
