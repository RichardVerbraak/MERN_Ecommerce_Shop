import axios from 'axios'

// Thunk is a programming concept where a function is used to delay the evaluation/calculation of an operation

// Action				An object that is usually formatted like; type: 'REQUEST_SUCCESS', payload: data
// Action creator		Returns the action when the function is called (this has to return only the action object in Redux)
// Dispatch				A function that passes the object to the store (Synchronous)
// Thunk				Thunk lets us now return a function instead of only the action
//						This function has access to dispatch and the return value of said function will dispatch our action
// export const getProducts = async (dispatch) => {
// 	try {
// 		dispatch({
// 			type: 'PRODUCT_LIST_REQUEST',
// 		})

// 		const res = await axios.get('/api/products')
// 		console.log(res.data)

// 		dispatch({
// 			type: 'PRODUCT_LIST_SUCCESS',
// 			payload: res.data,
// 		})
// 	} catch (error) {
// 		dispatch({
// 			type: 'PRODUCT_LIST_FAIL',
// 			payload:
// 				error.response && error.response.data.message
// 					? error.response.data.message
// 					: error.message,
// 		})
// 	}
// }

export const getProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'PRODUCT_LIST_REQUEST',
			})

			const res = await axios.get('/api/products')

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

export const getProductDetails = (id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'PRODUCT_DETAIL_REQUEST',
			})

			const res = await axios.get(`/api/products/${id}`)

			dispatch({
				type: 'PRODUCT_DETAIL_SUCCESS',
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: 'PRODUCT_DETAIL_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const createProduct = (product) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'PRODUCT_CREATE_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.post(`/api/products`, product, config)

			dispatch({
				type: 'PRODUCT_CREATE_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'PRODUCT_CREATE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'PRODUCT_DELETE_REQUEST',
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			await axios.delete(`/api/products/${id}`, config)

			dispatch({
				type: 'PRODUCT_DELETE_SUCCESS',
			})
		} catch (error) {
			dispatch({
				type: 'PRODUCT_DELETE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}
