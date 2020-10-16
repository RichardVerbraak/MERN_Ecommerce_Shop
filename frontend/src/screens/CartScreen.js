import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCartItem } from '../actions/cartActions'

import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
	const productID = match.params.id

	// Splits it into an array from ?qty=1 to [?qty=, 1] and then converted to a number data type (was a string before)
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	useEffect(() => {
		if (productID) {
			dispatch(addCartItem(productID, qty))
		}
	}, [dispatch, productID, qty])

	return <div>Cart</div>
}

export default CartScreen
