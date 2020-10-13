import axios from 'axios'

// Thunk is a programming concept where a function is used to delay the evaluation/calculation of an operation

// Action				An object that is usually formatted like; type: 'REQUEST_SUCCESS', payload: data
// Action creator		Returns the action when it's called (this has to return only the action object in Redux)
// Thunk				Will let your action creator return a function now, that also has access to store.dispatch
//						Now will asynchronously return the action, then fetch the data, then return another action
export const getProducts = async (dispatch) => {
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

// export const getProducts = () => {
// 	return async (dispatch) => {
// 		try {
// 			dispatch({
// 				type: 'PRODUCT_LIST_REQUEST',
// 			})

// 			const res = await axios.get('/api/products')
// 			console.log(res.data)

// 			dispatch({
// 				type: 'PRODUCT_LIST_SUCCESS',
// 				payload: res.data,
// 			})
// 		} catch (error) {
// 			dispatch({
// 				type: 'PRODUCT_LIST_FAIL',
// 				payload:
// 					error.response && error.response.data.message
// 						? error.response.data.message
// 						: error.message,
// 			})
// 		}
// 	}
// }
