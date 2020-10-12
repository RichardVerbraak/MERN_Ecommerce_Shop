const initialState = {
	loading: null,
	products: [],
	error: null,
}

// Could use constants (where I place the string like 'PRODUCT_LIST_FAIL' inside of a const variable in another folder and import them here)
// However I don't mind when they are strings like below

export const productListReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCT_LIST_REQUEST':
			return {
				loading: true,
				products: [],
			}
		case 'PRODUCT_LIST_SUCCESS':
			return {
				loading: false,
				products: action.payload,
			}
		case 'PRODUCT_LIST_FAIL':
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
