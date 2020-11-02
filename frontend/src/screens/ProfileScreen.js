import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	//// User details state
	const userDetails = useSelector((state) => {
		return state.userDetails
	})
	const { loading, error, user } = userDetails

	//// User login state
	const userLogin = useSelector((state) => {
		return state.userLogin
	})
	const { userInfo } = userLogin

	console.log(userInfo)

	//// User update state
	const userUpdateProfile = useSelector((state) => {
		return state.userUpdateProfile
	})
	const { success } = userUpdateProfile

	// If I dont return the state in the USER_DETAILS_REQUEST, the user field from state won't have anything and won't trigger useEffect user dependecy
	// If success => we reset user update (idk why, since now we have now success message) => getting the userDetails again thus having the name field updated
	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name || !user.name || success) {
				dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, user, success])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			)
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>

				{message && <Message variant='danger'>{message}</Message>}
				{success && <Message variant='success'>Profile updated</Message>}

				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) => {
									setName(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

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

						<Form.Group controlId='password'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Confirm password'
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</Col>
			<Col md={9}>
				<h2>My orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
