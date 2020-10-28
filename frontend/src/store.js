import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Product Reducers
import {
	productListReducer,
	productDetailReducer,
} from './reducers/productReducers'

// Cart Reducers
import { cartReducer } from './reducers/cartReducers'

// User Reducers
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
} from './reducers/userReducers'

//###!!! DO NOT FORGET TO SPECIFY THE NAME OF THE REDUCER LIKE: state.productList.loading and NOT state.loading
// When using the connect function with Redux (mapStateToProps etc.)
const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

// This is the same as doing state.cart.cartItems: cartItemsFromStorage
// It's like a global state but here were grabbing only the cart reducer's state
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
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
