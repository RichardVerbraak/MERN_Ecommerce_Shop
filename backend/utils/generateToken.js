import jwt from 'jsonwebtoken'

// Sign the token (store the user ID in token) with secret, expires in 30days
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
