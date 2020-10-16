const initialState = {
	cartItems: [],
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM':
			return {
				...state,
				cartItems: action.payload,
			}

		default:
			return state
	}
}
