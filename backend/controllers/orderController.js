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
// Get the order from DB and also populate it with the users name and email
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

// @desc       	Update order to isPaid: true
// @route       GET /api/orders/:id/pay
// @access      Private
// Find order => update the fields => save to DB => send back updated order
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// @desc       	Get users orders
// @route       GET /api/orders/myorders
// @access      Private
const getUsersOrders = asyncHandler(async (req, res) => {
	// Finds all orders from the user that has been assigned to the request object in Protect Middleware
	const orders = await Order.find({ user: req.user._id })

	if (orders) {
		res.json(orders)
	} else {
		res.status(404)
		throw new Error('No orders found')
	}
})

// @desc       	Get all orders (Admin Only)
// @route       GET /api/orders/
// @access      Private
const getAllOrders = asyncHandler(async (req, res) => {
	// Also get the user associated with the order
	const orders = await Order.find({}).populate('user', 'id name')

	if (orders) {
		res.json(orders)
	} else {
		res.status(404)
		throw new Error('No orders found')
	}
})

export {
	addOrderItems,
	getOrder,
	updateOrderToPaid,
	getUsersOrders,
	getAllOrders,
}
