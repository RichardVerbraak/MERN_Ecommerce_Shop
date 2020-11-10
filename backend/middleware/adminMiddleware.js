import asyncHandler from 'express-async-handler'

const checkAdmin = asyncHandler(async (req, res, next) => {
	try {
		if (req.user && req.user.isAdmin === true) {
			next()
		}
	} catch (error) {
		console.error(error)
		res.status(401)
		throw new Error('Access denied, admin only.')
	}
})

export default checkAdmin
