import axios from 'axios'

// I don't honestly know why were saving them to localStorage, I would've saved cart items to MongoDB under the users ID
// I would then fetch them from MongoDB to store it in Redux
// TLDR; Store in Redux, then MongoDB, then later fetch from MongoDB to store in Redux again.
export const addCartItem = (id, qty) => {
	return async (dispatch, getState) => {
		// Already get json back from promise due to axios, no need for res.json()
		const { data } = await axios.get(`/api/products/${id}`)

		// Save to Redux
		// Quantity is already coming in from cartScreen
		// Maybe use {...payload.action, qty} ?
		dispatch({
			type: 'ADD_CART_ITEM',
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			},
		})

		// Save to localStorage after it's in the Redux state with getState
		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	}
}

export const removeCartItem = () => {
	return async (dispatch) => {
		try {
		} catch (error) {}
	}
}
