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

export const getDetails = (id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'PRODUCT_DETAIL_REQUEST',
			})

			console.log(id)
			const res = await axios.get(`/api/products/${id}`)
			console.log(res.data)

			dispatch({
				type: 'PRODUCT_DETAIL_SUCCESS',
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: 'PRODUCT_DETAIL_FAIL',
				payload: error.message,
			})
		}
	}
}
