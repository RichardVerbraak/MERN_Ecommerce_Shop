import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc        Create new order
// @route       POST /api/orders
// @access      Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
		return
	} else {
		const order = await Order.create({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})

		res.status(201)
		res.json(order)
	}
})

// @desc        Get order
// @route       GET /api/orders/order/orderID
// @access      Private
const getOrder = asyncHandler(async (req, res) => {
	if (req.params.id) {
		const order = await Order.findById(req.params.id)
		res.json(order)
	} else {
		res.status(400)
		throw new Error('Order not found')
	}
})

export { addOrderItems, getOrder }
