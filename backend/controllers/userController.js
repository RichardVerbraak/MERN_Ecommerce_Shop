import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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
	const userMatch = await user.matchPassword(password)

	if (user && userMatch) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: null,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

export { authUser }
