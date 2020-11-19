import express from 'express'
import {
	addOrderItems,
	getAllOrders,
	getOrder,
	getUsersOrders,
	markOrderDelivered,
	updateOrderToPaid,
} from '../controllers/orderController.js'
import checkAdmin from '../middleware/adminMiddleware.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// The /:id should be at the bottom or other routes that have /something will be looked at like at an ID
router
	.route('/')
	.post(protect, addOrderItems)
	.get(protect, checkAdmin, getAllOrders)

// Get users orders
router.route('/myorders').get(protect, getUsersOrders)

// Get order by ID
// Update order to delivered (Admin)
router
	.route('/:id')
	.get(protect, getOrder)
	.put(protect, checkAdmin, markOrderDelivered)

// Update order to isPaid
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
