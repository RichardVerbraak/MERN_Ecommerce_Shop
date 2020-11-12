import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	adminEditUser,
	getUserById,
} from '../controllers/userController.js'
import checkAdmin from '../middleware/adminMiddleware.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// Get all users
router.route('/').get(protect, checkAdmin, getUsers)

// Register user
router.post('/', registerUser)

// Login and authorize user by giving a token
router.post('/login', authUser)

// Get and update users profile
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

// Get user by ID, Edit user (Admin), delete a user
router
	.route('/:id')
	.get(protect, checkAdmin, getUserById)
	.put(protect, checkAdmin, adminEditUser)
	.delete(protect, checkAdmin, deleteUser)

export default router
