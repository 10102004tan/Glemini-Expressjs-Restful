const multer = require('multer');
const path = require('path');

// Config storage for multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Folder to save file
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		); // Rename file
	},
});

// Limit file size
const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png|gif/;
	const extname = fileTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = fileTypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error('Only images are allowed!'));
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
});

module.exports = upload;
