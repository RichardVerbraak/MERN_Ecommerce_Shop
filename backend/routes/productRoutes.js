import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// Routes are the sames as controllers, they perform logic based on a certain request like the below routes

// Instead of having a try/catch in every route we use asyncHandler
// It passes exceptions inside async routes (things outside of the normal expectations aka errors) to your express error handlers

// @desc        Gets all products
// @route       GET /api/products
// @access      Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		// Gets all products (Empty object just gets everything)
		const products = await Product.find({})

		res.json(products)
	})
)

// @desc        Gets single product by ID
// @route       GET /api/products/:id
// @access      Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)

		if (product) {
			res.json(product)
		} else {
			res.status(404)
			throw new Error('No product found with that ID')
		}
	})
)

export default router
