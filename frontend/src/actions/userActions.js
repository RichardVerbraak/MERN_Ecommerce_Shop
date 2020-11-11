import axios from 'axios'

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'USER_LOGIN_REQUEST',
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/login',
				{ email, password },
				config
			)

			dispatch({
				type: 'USER_LOGIN_SUCCESS',
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: 'USER_LOGIN_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

// Reset the state when logging out
export const logout = () => {
	return (dispatch) => {
		localStorage.removeItem('userInfo')

		dispatch({
			type: 'USER_LOGOUT',
		})

		dispatch({
			type: 'USER_DETAILS_RESET',
		})

		dispatch({
			type: 'ORDER_MY_LIST_RESET',
		})

		dispatch({
			type: 'USER_LIST_RESET',
		})
	}
}

export const register = (name, email, password) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'USER_REGISTER_REQUEST',
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users',
				{ name, email, password },
				config
			)

			dispatch({
				type: 'USER_REGISTER_SUCCESS',
				payload: data,
			})

			// Log the user in after succesful register
			dispatch({
				type: 'USER_LOGIN_SUCCESS',
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: 'USER_REGISTER_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

// getState to get the token from userInfo, so we can access /profile
export const getUserDetails = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'USER_DETAILS_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/users/${id}`, config)

			dispatch({
				type: 'USER_DETAILS_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'USER_DETAILS_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const updateUserProfile = (user) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'USER_UPDATE_PROFILE_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.put('/api/users/profile', user, config)

			dispatch({
				type: 'USER_UPDATE_PROFILE_SUCCESS',
				payload: data,
			})

			dispatch({
				type: 'USER_LOGIN_SUCCESS',
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: 'USER_UPDATE_PROFILE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const getUsers = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'USER_LIST_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get('/api/users', config)

			dispatch({
				type: 'USER_LIST_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'USER_UPDATE_PROFILE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const deleteUser = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'USER_DELETE_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			await axios.delete(`/api/users/${id}`, config)

			dispatch({
				type: 'USER_DELETE_SUCCESS',
			})
		} catch (error) {
			dispatch({
				type: 'USER_DELETE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}
