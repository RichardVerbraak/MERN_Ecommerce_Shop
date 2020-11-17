import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { editProduct, getProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ match, history }) => {
	const productID = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => {
		return state.productDetails
	})
	const { loading, error, product } = productDetails

	const productEdit = useSelector((state) => {
		return state.productEdit
	})
	const {
		loading: loadingEdit,
		error: errorEdit,
		success: successUpdate,
	} = productEdit

	const uploadFile = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post('/api/upload', formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	// Gets details twice, bug?
	useEffect(() => {
		if (successUpdate) {
			dispatch({
				type: 'PRODUCT_EDIT_RESET',
			})
			dispatch({
				type: 'PRODUCT_DETAIL_RESET',
			})
			history.push('/admin/productList')
		} else {
			if (!product || !product.name || product._id !== productID) {
				dispatch(getProductDetails(productID))
			} else {
				setName(product.name)
				setPrice(product.price)
				setDescription(product.description)
				setImage(product.image)
				setBrand(product.brand)
				setCategory(product.category)
				setCountInStock(product.countInStock)
			}
		}
	}, [dispatch, product, productID, history, successUpdate])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			editProduct({
				_id: productID,
				name,
				price,
				description,
				image,
				brand,
				category,
				countInStock,
			})
		)
		dispatch({
			type: 'PRODUCT_EDIT_RESET',
		})
	}

	return (
		<Fragment>
			<Link to='/admin/productList' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loadingEdit && <Loader />}
			{errorEdit && <Message variant='danger'>{errorEdit}</Message>}
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingEdit && <Loader />}
				{errorEdit && <Message variant='danger'>{errorEdit}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => {
									setName(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => {
									setPrice(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => {
									setDescription(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(e) => {
									setImage(e.target.value)
								}}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={uploadFile}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => {
									setBrand(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => {
									setCategory(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count in stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter count in stock'
								value={countInStock}
								onChange={(e) => {
									setCountInStock(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</Fragment>
	)
}

export default ProductEditScreen
