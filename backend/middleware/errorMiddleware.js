// Whenever the next() function takes an argument, that will be considered as an "error".

// If this happens, then Express will skip all middleware execution in the middleware stack and triggers the "Global error middleware"
// to throw the error message that we have defined in Global Error Middleware.

// When an error happens in any of the routes, errorHandler middleware will run due to asyncHandler
// AsyncHandler is the same as doing this, which is passing the error with next() DIRECTLY to our custom error handler (due to express)
// try {
// 	// whatever needs to be done with this route
// } catch (error) {
// 	next(error)
// }

// Fallback handler for 404 errors
// Passes the error to our errorHandler with next if no matching route was found
const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

// To override the normal error handler behaviour in middleware functions, you have to place the error argument before the req, res args
// ALWAYS FOUR args even though you dont use some of them
// In production we don't need to stack trace (backtrack) to where the error came from
const errorHandler = (err, req, res, next) => {
	// Sometimes you get status 200 even though there's an error, so this handles that as well
	const errorStatus = res.statusCode === 200 ? 500 : res.statusCode

	// Set the status to the error code we made (convert 200 to 500 for reasons above)
	res.status(errorStatus)

	// err.message comes from our custom error handler (asyncHandler)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	})
}

export { notFound, errorHandler }
