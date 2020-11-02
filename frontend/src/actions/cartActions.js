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
		// Maybe use {...payload.action, qty} ? (Nevermind, we only need these values not things like brand and reviews)
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

export const removeCartItem = (id) => {
	return async (dispatch, getState) => {
		dispatch({
			type: 'REMOVE_CART_ITEM',
			payload: id,
		})

		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	}
}

export const saveShippingAddress = (data) => {
	return async (dispatch) => {
		dispatch({
			type: 'CART_SAVE_SHIPPING_ADDRESS',
			payload: data,
		})

		localStorage.setItem('shippingAddress', JSON.stringify(data))
	}
}

export const savePaymentMethod = (paymentMethod) => {
	return async (dispatch) => {
		dispatch({
			type: 'CART_SAVE_PAYMENT_METHOD',
			payload: paymentMethod,
		})

		localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
	}
}
