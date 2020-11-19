import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Product Reducers
import {
	productListReducer,
	productDetailReducer,
	productDeleteReducer,
	productCreateReducer,
	productEditReducer,
} from './reducers/productReducers'

// Cart Reducers
import { cartReducer } from './reducers/cartReducers'

// User Reducers
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userEditReducer,
} from './reducers/userReducers'

// Order Reducers
import {
	orderAdminListReducer,
	orderCreateReducer,
	orderDetailsReducer,
	orderMyListReducer,
	orderPayReducer,
} from './reducers/orderReducer'

//###!!! DO NOT FORGET TO SPECIFY THE NAME OF THE REDUCER LIKE: state.productList.loading and NOT state.loading
// When using the connect function with Redux (mapStateToProps etc.)
const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailReducer,
	productCreate: productCreateReducer,
	productDelete: productDeleteReducer,
	productEdit: productEditReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userEdit: userEditReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMyList: orderMyListReducer,
	orderAdminList: orderAdminListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: null

// This is the same as doing state.cart.cartItems: cartItemsFromStorage
// It's like a global state but here were grabbing only the cart reducer's state
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: {
		userInfo: userInfoFromStorage,
	},
}

// Our array of middleware (which only has thunk atm)
const middleware = [thunk]

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
