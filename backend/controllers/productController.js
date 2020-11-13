import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Instead of having a try/catch in every route we use asyncHandler
// It passes exceptions inside async routes (things outside of the normal expectations aka errors) to your express error handlers

// @desc        Gets all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
	// Gets all products (Empty object just gets everything)
	const products = await Product.find({})

	res.json(products)
})

// @desc        Gets single product by ID
// @route       GET /api/products/:id
// @access      Public
const getProductbyID = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(400)
		throw new Error('Product not found')
	}
})

const editProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
})

export { getProducts, getProductbyID }
