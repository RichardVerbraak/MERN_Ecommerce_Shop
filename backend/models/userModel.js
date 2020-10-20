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

// Arrow functions prevent binding 'this' and so the function will not have access to the document and will say password is undefined
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('user', userSchema)

export default User
