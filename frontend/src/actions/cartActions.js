import axios from 'axios'

export const addCartItem = (id, qty) => {
	return async (dispatch, getState) => {
		try {
			// Already get json back from promise due to axios, no need for res.json()
			const { data } = await axios.get(`/api/products/${id}`)

			// Quantity is already coming in from cartScreen
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

			localStorage.setItem(
				'cartItems',
				JSON.stringify(getState().cart.cartItems)
			)
		} catch (error) {}
	}
}

export const removeCartItem = () => {
	return async (dispatch) => {
		try {
		} catch (error) {}
	}
}
