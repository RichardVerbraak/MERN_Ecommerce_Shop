import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
} from '../controllers/userController.js'
import checkAdmin from '../middleware/adminMiddleware.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, checkAdmin, getUsers)
router.post('/', registerUser)

router.post('/login', authUser)

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

export default router
