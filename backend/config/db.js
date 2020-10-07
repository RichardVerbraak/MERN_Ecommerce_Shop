import mongoose from 'mongoose'

// Async function because mongoose .x method returns a promise and this is cleaner than .then chaining
const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB
