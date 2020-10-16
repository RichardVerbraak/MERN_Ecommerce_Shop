import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartReducer } from '../reducers/cartReducers'
import { addCartItem } from '../actions/cartActions'

const CartScreen = ({ match, location }) => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => {
		return state.cart
	})

	const { addCartItem } = cart

	useEffect(() => {}, [match])

	console.log(match)
	console.log(location)
	return <div>Cart</div>
}

export default CartScreen
