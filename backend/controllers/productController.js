import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// Instead of having a try/catch in every route we use asyncHandler
// It passes exceptions inside async routes (things outside of the normal expectations aka errors) to your express error handlers

// @desc        Gets all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 2
	const page = Number(req.query.pageNumber) || 1

	// If there is a query => try to match the name with the query and have it be case insensitive (options: 'i')
	const searchQuery = req.query.search
		? {
				name: {
					$regex: req.query.search,
					$options: 'i',
				},
		  }
		: {}

	// Number of products (all products or by the searchQuery)
	const count = await Product.countDocuments({ ...searchQuery })

	// Gets all products if there is no search (empty object finds all)
	// Or finds the product that matches the products name to the regular expression
	// Limits it to 2 per page
	// Skip X products according to the amount of products per page and what page we are at (page 2 would be 2 x (2 - 1) = 2, so skip first 2 products)
	const products = await Product.find({ ...searchQuery })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	// Return how many pages there are
	res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

// @desc        Create a product (Admin Only)
// @route       POST /api/products/
// @access      Private
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()

	if (createdProduct) {
		res.status(201).json(createdProduct)
	} else {
		res.status(500)
		throw new Error('Server error')
	}
})

// @desc        Delete a product (Admin Only)
// @route       DELETE /api/products/:id
// @access      Private
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()

		res.json({ message: 'Product deleted' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc        Edit a product (Admin Only)
// @route       PUT /api/products/:id
// @access      Private
const editProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body

	if (product) {
		product.name = name || product.name
		product.price = price || product.price
		product.description || description || product.description
		product.image = image || product.image
		product.brand = brand || product.brand
		product.category = category || product.category
		product.countInStock = countInStock || product.countInStock

		const updatedProduct = await product.save()

		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc        Add a review to a product
// @route       POST /api/products/:id/reviews
// @access      Private
const createReview = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	const { rating, comment } = req.body

	if (product) {
		const alreadyReviewed = product.reviews.find((review) => {
			return review.user.toString() === req.user._id.toString()
		})

		if (!alreadyReviewed) {
			const review = {
				user: req.user._id,
				name: req.user.name,
				rating: Number(rating),
				comment,
			}

			product.reviews.push(review)

			product.numReviews = product.reviews.length

			product.rating = product.reviews.reduce((acc, item) => {
				return (item.rating + acc) / product.reviews.length
			}, 0)

			await product.save()

			res.status(201).json({ message: 'Review added' })
		} else {
			res.status(400)
			throw new Error('Product already reviewed')
		}
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc       	Get top rated products
// @route       GET /api/products/top
// @access      Public
// Sorts by rating in ascending order and only the top 3
const getTopRatedProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)

	res.json(products)
})

export {
	getProducts,
	getProductbyID,
	createProduct,
	deleteProduct,
	editProduct,
	createReview,
	getTopRatedProducts,
}
