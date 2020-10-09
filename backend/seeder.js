import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// Access to connectDB (function that has access to the Mongo URI env variable)
dotenv.config()

// Connect to the DB
connectDB()

// Add dummy data to the DB
const importData = async () => {
	try {
		// Clear everything so you dont import the same data twice (its dummy data anyway )
		// Deletes all data if args left empty
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		// Import the data into the DB with the user model (think of the model like 'guidelines' for your data)
		// The data structure has to adhere to the model basically
		const createdUsers = await User.insertMany(users)

		// Brad used createdUsers[0] since the admin is at the start of our array but this is more 'safe' (its still only dummy data though)
		const foundAdmin = createdUsers.find((user) => {
			return user.isAdmin === true
		})

		// ID of the admin user
		const adminUserID = foundAdmin._id

		// Casts (adds) the admin users ID to each product
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUserID }
		})

		// Adds the products to the DB
		await Product.insertMany(sampleProducts)

		console.log('Data imported!'.green.inverse)
		process.exit()
	} catch (error) {
		console.error(`Error: ${error}`.red.inverse)
	}
}

// Removes all data from the DB
const deleteData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data deleted!'.red.inverse)
		process.exit()
	} catch (error) {
		console.error(`Error: ${error}`.red.inverse)
	}
}

// If second argument in the terminal has the -d flag, delete the data
if (process.argv[2] === '-d') {
	deleteData()
} else {
	importData()
}
