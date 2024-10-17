'use strict';

const multer = require('multer');
const path = require('path');

const uploadMemory = multer({
	storage: multer.memoryStorage(),
});

const uploadDisk = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './src/v1/uploads/users');
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

// Cấu hình storage cho multer để lưu file ảnh của câu hỏi
const storageQuestions = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/questions');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

// Cấu hình storage cho multer để lưu file ảnh của Quiz
const storageQuizzes = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/quizzes');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		); // Rename file
	},
});

// Cấu hình storage cho multer để lưu các file template của Quiz
const storageDocs = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/docs');
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
	storage: storageQuestions,
	fileFilter: fileFilter,
});

const uploadQuizzes = multer({
	storage: storageQuizzes,
	fileFilter: fileFilter,
});

const uploadDocs = multer({
	storage: storageDocs,
});

module.exports = {
	uploadMemory,
	uploadDisk,
	uploadQuestions,
	uploadQuizzes,
	uploadDocs,
};
