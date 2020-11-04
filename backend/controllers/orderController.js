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

// @desc        Get order by ID
// @route       GET /api/orders/:id
// @access      Private
const getOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

export { addOrderItems, getOrder }
