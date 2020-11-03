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
