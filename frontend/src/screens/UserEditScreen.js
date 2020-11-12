import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { editUser, getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {
	const userID = match.params.id

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState('')

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => {
		return state.userDetails
	})
	const { loading, error, user } = userDetails

	const userEdit = useSelector((state) => {
		return state.userEdit
	})
	const { loading: loadingEdit, error: errorEdit, success } = userEdit

	// Clear the state and go back to userList on success
	// Else: get the users details if userDetails is empty or doesn't match the ID in the URL
	// If those are there, set the input fields to that users details
	useEffect(() => {
		if (success) {
			dispatch({
				type: 'USER_EDIT_RESET',
			})
			history.push('/admin/userList')
		} else {
			if (!user.name || user._id !== userID) {
				dispatch(getUserDetails(userID))
			} else {
				setName(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [dispatch, user, userID, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(editUser(user._id, { name, email, isAdmin }))
	}

	return (
		<Fragment>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
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

						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => {
									setIsAdmin(e.target.checked)
								}}
							></Form.Check>
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

export default UserEditScreen
