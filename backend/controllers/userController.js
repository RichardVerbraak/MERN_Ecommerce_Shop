import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import jwt from 'jsonwebtoken'

// res.send doesn't work when you send TWO strings like res.send(email, password)

// @desc        Auth the user & get token to keep user authorized and logged in
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Find user by mail
	const user = await User.findOne({ email })

	// Check if passwords match (matchPassword is made as a method onto the userModel to keep this file cleaner)
	// Could've use bcrypt and check in this file as well, which is in my opinion more readable
	// Could also bring in jwt and sign the token in here
	const userMatch = await user.matchPassword(password)

	if (user && userMatch) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

// @desc       	Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
	const { token } = req.body
	const { id, iat, exp } = jwt.decode(token)
	const user = await User.findById(id)
	console.log(user)
	res.send(id)
})

export { authUser, getUserProfile }
