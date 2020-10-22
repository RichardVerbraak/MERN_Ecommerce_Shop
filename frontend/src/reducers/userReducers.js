const initialState = {
	loading: null,
	userInfo: {},
	errors: null,
}

export const userLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
			return {
				loading: true,
			}
		case 'USER_LOGIN_SUCCESS':
			return {
				loading: false,
				userInfo: action.payload,
			}
		case 'USER_LOGIN_FAIL':
			return {
				...state,
				errors: action.payload,
			}
		case 'USER_LOGOUT':
			return {}
		default:
			return state
	}
}
