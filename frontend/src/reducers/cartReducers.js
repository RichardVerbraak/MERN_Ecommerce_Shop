const initialState = {
	cartItems: [],
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM':
			const item = action.payload
			const itemExists = state.cartItems.find((cartItem) => {
				return item._id === cartItem._id
			})

			if (itemExists) {
				return {
					...state,
					cartItems: state.cartItems.map((item) => {
						return item._id === itemExists._id ? itemExists : item
					}),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}

		default:
			return state
	}
}
