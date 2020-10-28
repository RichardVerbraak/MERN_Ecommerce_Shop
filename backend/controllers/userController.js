import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// res.send doesn't work when you send TWO strings like res.send(email, password)

// @desc        Auth the user & get token to keep user authorized and logged in
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Find user by mail
	const user = await User.findOne({ email })

	// My solution, which gives a different error of: Cannot read property 'matchPassword' of null
	// This is probably because my if else doesn't even run, the error happens earlier UNLESS I put it inside the if statement
	// Causing the if clause to fail and then moves on to the else clause
	// const userMatch = await user.matchPassword(password)

	// Check if passwords match (matchPassword is a method made onto the userModel just to keep this file cleaner)
	// Could've use bcrypt and check in this file as well, which is in my opinion more readable
	// Could also bring in jwt and sign the token in here
	// Send back the info + a signed token that has the user's ID needed to authenticate on protected routes
	if (user && (await user.matchPassword(password))) {
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

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Create is the same as using .save method
	// The hashing of the password happens in the user model BEFORE this is sent to the DB
	// Could also hash it in the controller but Brad chooses not to for clarity
	const user = await User.create({
		name,
		email,
		password,
	})

	// Create token upon registering so you're instantly authenticated
	if (user) {
		res.status(201)
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

//## In private routes we have access to the users details via req.user to protect middleware
// Protect middleware looks for a token, decodes it and matches it with the one in the DB
// Then it assigns it to the request object with the data that comes back from the DB

// @desc       	Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	// Return this info to the logged in user
	if (user) {
		console.log(user)
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc        Update a user
// @route       Put /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	// Sets the name, email, password to the info we get from the frontend OR leave it as is if something wasn't send
	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email

		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		// Send another token back so he stays logged in
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
