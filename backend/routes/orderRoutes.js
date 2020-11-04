import express from 'express'
import { addOrderItems, getOrder } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// The /:id should be at the bottom or other routes that have /something will be looked at like at an ID
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(getOrder)

export default router
