import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

// Morgan logs the http requests and status codes to the console
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// When ready to pay, hit this route to start up the paypal procedure
app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID)
})

// Making the uploads folder static
// Because we use ES Modules (import/export) and not common JS (require) we have to mimic common JS by us path.resolve
const folder = path.resolve()
app.use('/uploads', express.static(path.join(folder, '/uploads')))

if (process.env.NODE_ENV === 'production') {
	// Build static folder
	app.use(express.static(path.join(folder, '/frontend/build')))

	// Get anything that isnt any of the above routes (*)
	// Send the index.html file
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(folder, 'frontend', 'build', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.send('API is running....')
	})
}

// This function will run when it can't match a route
app.use(notFound)

// Define error handling middleware last after other app.use
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
)
