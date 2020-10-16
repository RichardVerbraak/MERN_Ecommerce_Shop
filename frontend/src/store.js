import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Product Reducers
import {
	productListReducer,
	productDetailReducer,
} from './reducers/productReducers'

// Cart Reducer
import { cartReducer } from './reducers/cartReducers'

//###!!! DO NOT FORGET TO SPECIFY THE NAME OF THE REDUCER LIKE: state.productList.loading and NOT state.loading
// When using the connect function with Redux (mapStateToProps etc.)
const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailReducer,
	cart: cartReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

// This is the same as doing state.cart.cartItems: cartItemsFromLocalStorage
// It's like a global state but here were grabbing only the cart reducer's state
const initialState = {
	cart: {
		cartItems: cartItemsFromLocalStorage,
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
