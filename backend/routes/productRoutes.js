import express from 'express'
import {
	getProducts,
	getProductbyID,
} from '../controllers/productController.js'
const router = express.Router()

// Controllers perform logic based on a certain request, we moved these out of the folder just to clean it up

// They both do the same, syntax is just slightly different
router.route('/').get(getProducts)

router.get('/:id', getProductbyID)

export default router
