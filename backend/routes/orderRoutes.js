import express from 'express'
import { addOrderItems, getOrder } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/order/:id').get(getOrder)

export default router
