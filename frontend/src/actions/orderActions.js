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

export const orderReset = () => {
	return (dispatch) => {
		dispatch({
			type: 'ORDER_PAY_RESET',
		})
	}
}
