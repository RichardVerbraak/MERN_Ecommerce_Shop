import axios from 'axios'

export const getProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'PRODUCT_LIST_REQUEST',
			})

			const res = await axios.get('/api/products')
			console.log(res.data)

			dispatch({
				type: 'PRODUCT_LIST_SUCCESS',
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: 'PRODUCT_LIST_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}
