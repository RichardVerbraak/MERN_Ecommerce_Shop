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
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailReducer,
	cartList: cartReducer,
})

const initialState = {}

// Our array of middleware (which only has thunk atm)
const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
