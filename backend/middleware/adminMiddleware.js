import asyncHandler from 'express-async-handler'

const checkAdmin = asyncHandler(async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Access denied, admin only.')
	}
})

export default checkAdmin
