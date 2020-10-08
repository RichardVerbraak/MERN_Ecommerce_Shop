import bcrypt from 'bcryptjs'

// Has to be the same as our mongoDB model otherwise mongoose wont let us insert the data into the DB (vice-versa as well)
// Can leave out isAdmin since that is false by default
const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Jane Doe',
		email: 'jane@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
