import path from 'path'
import express from 'express'
import protect from '../middleware/authMiddleware.js'
import checkAdmin from '../middleware/adminMiddleware.js'
import multer from 'multer'
const router = express.Router()

// Stores the file in the uploads folder in the root with the file name + date and the extension
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})

// Checks for image types
function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!')
	}
}

// Takes in the image to get checked and then stored
const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

// Send back the request we get back from uploading (the file path that is now in the uploads folder)
// Had to replace the backslash with a front slash due to weird bug causing the path to look like: /images\sample
router.post('/', protect, checkAdmin, upload.single('image'), (req, res) => {
	res.send(`/${req.file.path.replace('\\', '/')}`)
})

export default router
