export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ORDER_CREATE_REQUEST':
			return {
				loading: true,
			}
		case 'ORDER_CREATE_SUCCESS':
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case 'ORDER_CREATE_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export const orderDetailsReducer = (
	state = { orderItems: [], shippingAddress: {}, loading: true },
	action
) => {
	switch (action.type) {
		case 'ORDER_DETAILS_REQUEST':
			console.log('REQUEST')
			return {
				...state,
				loading: true,
			}
		case 'ORDER_DETAILS_SUCCESS':
			console.log('SUCCESS')
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case 'ORDER_DETAILS_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
