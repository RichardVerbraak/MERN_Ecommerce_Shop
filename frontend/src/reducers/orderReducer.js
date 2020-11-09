// Creating an order
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

// Getting the details of the order
export const orderDetailsReducer = (
	state = { orderItems: [], shippingAddress: {}, loading: true },
	action
) => {
	switch (action.type) {
		case 'ORDER_DETAILS_REQUEST':
			return {
				...state,
				loading: true,
			}
		case 'ORDER_DETAILS_SUCCESS':
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

// Paying the order
export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ORDER_PAY_REQUEST':
			return {
				loading: true,
			}
		case 'ORDER_PAY_SUCCESS':
			return {
				loading: false,
				success: true,
			}
		case 'ORDER_PAY_FAIL':
			return {
				loading: false,
				error: action.payload,
			}
		case 'ORDER_PAY_RESET':
			return {}

		default:
			return state
	}
}

// Getting the users orders in the profile screen
export const orderMyListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case 'ORDER_MY_LIST_REQUEST':
			return {
				loading: true,
			}
		case 'ORDER_MY_LIST_SUCCESS':
			return {
				loading: false,
				orders: action.payload,
			}
		case 'ORDER_MY_LIST_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
