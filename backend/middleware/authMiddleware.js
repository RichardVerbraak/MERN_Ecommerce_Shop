import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

////////// Route Protection
// 1. This middleware will be used in a route when we want to protect it
// 2. This is because this will check to see if there is a token
// 3. If there is, we decode it and assign it to the req object as req.user (minus the password)
// 4. If not, send an error about not being authorized to do so or when failed

// Middleware needs next function for it to go to the next function
const protect = asyncHandler(async (req, res, next) => {
	let token

	// Bearer and then the token is just convention
	// Token is send in authorization header
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Split to get only the token value, not Bearer
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// Make user object onto the req object to the user that comes from MongoDB (w/o password in there)
			req.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

export default protect
