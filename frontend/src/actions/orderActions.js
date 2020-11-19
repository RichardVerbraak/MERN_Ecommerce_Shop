import axios from 'axios'

export const createOrder = (order) => {
	return async (dispatch, getState) => {
		const {
			userLogin: { userInfo },
		} = getState()

		try {
			dispatch({
				type: 'ORDER_CREATE_REQUEST',
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.post('/api/orders', order, config)

			dispatch({
				type: 'ORDER_CREATE_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'ORDER_CREATE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const getOrderDetails = (id) => {
	return async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
			} = getState()

			dispatch({
				type: 'ORDER_DETAILS_REQUEST',
			})

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/orders/${id}`, config)

			dispatch({
				type: 'ORDER_DETAILS_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'ORDER_CREATE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const payOrder = (id, paymentResult) => {
	return async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			dispatch({
				type: 'ORDER_PAY_REQUEST',
			})

			const { data } = await axios.put(
				`/api/orders/${id}/pay`,
				paymentResult,
				config
			)

			dispatch({
				type: 'ORDER_PAY_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'ORDER_PAY_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const orderPayReset = () => {
	return (dispatch) => {
		dispatch({
			type: 'ORDER_PAY_RESET',
		})
	}
}

export const getUsersOrders = () => {
	return async (dispatch, getState) => {
		console.log('called')
		try {
			const {
				userLogin: { userInfo },
			} = getState()

			dispatch({
				type: 'ORDER_MY_LIST_REQUEST',
			})

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get('/api/orders/myorders', config)

			dispatch({
				type: 'ORDER_MY_LIST_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'ORDER_MY_LIST_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const getAllOrders = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'ORDER_ADMIN_LIST_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get('/api/orders', config)

			dispatch({
				type: 'ORDER_ADMIN_LIST_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'ORDER_MY_LIST_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}
