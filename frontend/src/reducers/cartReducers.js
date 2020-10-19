const initialState = {
	cartItems: [],
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM':
			const item = action.payload

			// First check by ID (product) if the item already exists in the cart
			const existingItem = state.cartItems.find((cartItem) => {
				return item.product === cartItem.product
			})

			// If it exists, loop through items and check which already exists ? set that to the new payload : let item stay as it was
			if (existingItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => {
						return x.product === existingItem.product ? item : x
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
