const initialProductState = {
	loading: null,
	products: [],
	error: null,
}

// Could use constants (where I place the string like 'PRODUCT_LIST_FAIL' inside of a const variable in another folder and import them here)
// However I don't mind when they are strings like below

export const productListReducer = (state = initialProductState, action) => {
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

const initialProductDetailState = {
	loading: null,
	error: null,
	details: {},
}

export const productDetailReducer = (
	state = initialProductDetailState,
	action
) => {
	switch (action.type) {
		case 'PRODUCT_DETAIL_REQUEST':
			return {
				loading: true,
			}
		case 'PRODUCT_DETAIL_SUCCESS':
			return {
				loading: false,
				details: action.payload,
			}
		case 'PRODUCT_DETAIL_FAIL':
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const productCreateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case 'PRODUCT_CREATE_REQUEST':
			return {
				loading: true,
			}
		case 'PRODUCT_CREATE_SUCCESS':
			return {
				loading: false,
				success: true,
				product: action.payload,
			}
		case 'PRODUCT_CREATE_FAIL':
			return {
				loading: false,
				error: action.payload,
			}
		case 'PRODUCT_CREATE_RESET':
			return {
				product: {},
			}
		default:
			return state
	}
}

export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case 'PRODUCT_DELETE_REQUEST':
			return {
				loading: true,
			}
		case 'PRODUCT_DELETE_SUCCESS':
			return {
				loading: false,
				success: true,
			}
		case 'PRODUCT_DELETE_FAIL':
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const productEditReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case 'PRODUCT_EDIT_REQUEST':
			return {
				loading: true,
			}
		case 'PRODUCT_EDIT_SUCCESS':
			return {
				loading: false,
				success: true,
				product: action.payload,
			}
		case 'PRODUCT_EDIT_FAIL':
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
