import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Created at and updated add could be manually added but also with timestamps set to true
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

// Matches the password from the User document (model) to the one that was entered and thus came in via the route '/api/users/login'
// Arrow functions prevent binding 'this' and so the function will not have access to the document and will say password is undefined
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Function that encrypts the users password BEFORE (pre) we save to the DB
// isModified and pre comes from mongoose
// 1. If we for instance, only updated our name and email, we don't want this to hash/change our password suddenly, then call next to move on
// 2. Generate a salt, which returns a promise with said salt
// 3. Set the password to the hashed password, which takes in the plain text password (123456) and salt to hash it
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('user', userSchema)

export default User
