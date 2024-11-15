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

// Cấu hình storage cho multer để lưu file danh sách sinh viên dạng Excel
const storageStudents = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/excels');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		); // Rename file
	},
});

// Cấu hình storage cho multer để lưu file ảnh của người dùng yêu cầu GEMINI tạo ra các câu hỏi từ ảnh đó
const storageGenimiRequestImage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/v1/uploads/geminies');
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

const uploadGenimiRequestImage = multer({
	storage: storageGenimiRequestImage,
	fileFilter: fileFilter,
});

const uploadQuizzes = multer({
	storage: storageQuizzes,
	fileFilter: fileFilter,
});

const uploadExcel = multer({
	storage: storageStudents,
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
	uploadExcel,
	uploadGenimiRequestImage,
};
