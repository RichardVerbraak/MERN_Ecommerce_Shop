import express from 'express'
import {
	addOrderItems,
	getAllOrders,
	getOrder,
	getUsersOrders,
	updateOrderToPaid,
} from '../controllers/orderController.js'
import checkAdmin from '../middleware/adminMiddleware.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// The /:id should be at the bottom or other routes that have /something will be looked at like at an ID
router.route('/').post(protect, addOrderItems)
router.route('/').get(protect, checkAdmin, getAllOrders)
router.route('/myorders').get(protect, getUsersOrders)
router.route('/:id').get(protect, getOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
