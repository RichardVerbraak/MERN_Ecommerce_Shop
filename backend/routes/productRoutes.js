import express from 'express'
import protect from '../middleware/authMiddleware.js'
import checkAdmin from '../middleware/adminMiddleware.js'
import {
	getProducts,
	getProductbyID,
	deleteProduct,
	editProduct,
} from '../controllers/productController.js'
const router = express.Router()

// Controllers perform logic based on a certain request, we moved these out of the folder just to clean it up

router.route('/').get(getProducts)

router
	.route('/:id')
	.get(getProductbyID)
	.delete(protect, checkAdmin, deleteProduct)
	.put(protect, checkAdmin, editProduct)

export default router
