const initialState = {
	cartItems: [],
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM':
			const item = action.payload
			console.log(item)

			const itemExists = state.cartItems.find((cartItem) => {
				return item.product === cartItem.product
			})

			if (itemExists) {
				console.log('It exists', itemExists)
				return {
					...state,
					cartItems: state.cartItems.map((item) => {
						return item.product === itemExists.product ? itemExists : item
					}),
				}
			} else {
				console.log('Did not exist', item)
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}

		default:
			return state
	}
}
