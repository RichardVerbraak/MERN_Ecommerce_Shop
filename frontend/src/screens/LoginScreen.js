import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const userLogin = useSelector((state) => {
		return state.userLogin
	})

	const { loading, error, userInfo } = userLogin

	// 1. If you werent logged in and wanted to head to checkout, you'll first get redirected to login
	// 2. Shipping gets pulled off from the URL with the .split method
	// 3. When logged in the page refreshes due to userInfo now being in Redux and LocalStorage
	// 4. Because we have userInfo, the useEffect triggers and redirects us to the ShippingScreen
	// If you just came from the login link, there won't be any search query and you'll get pushed to '/'
	const redirect = location.search ? location.search.split('=')[1] : '/'
	console.log(redirect)
	console.log(location.search.split('=')[1])

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	const dispatch = useDispatch()

	return (
		<FormContainer>
			<h1>Sign in</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value)
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
