'use strict';

const multer = require('multer');
const path = require('path');

const uploadMemory = multer({
	storage: multer.memoryStorage(),
});

const uploadDisk = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './uploads');
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

// Config storage for multer
const storageQuestions = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/questions'); // Folder to save file
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		); // Rename file
	},
});

// Config storage for multer
const storageQuizzes = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/quizzes'); // Folder to save file
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

const uploadQuestions = multer({
	storageQuestions,
	// fileFilter: fileFilter,
});

const uploadQuizzes = multer({
	storageQuizzes,
	// fileFilter: fileFilter,
});

module.exports = {
	uploadMemory,
	uploadDisk,
	uploadQuestions,
	uploadQuizzes,
};
