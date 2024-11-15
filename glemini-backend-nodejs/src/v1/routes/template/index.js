'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Gốc thư mục uploads
const uploadsDir = path.join(__dirname, '../../uploads');

// Hàm kiểm tra file có tồn tại và gửi file
const sendFileSafely = (res, filePath) => {
	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			return res.status(404).json({ error: 'File not found' });
		}
		res.sendFile(filePath);
	});
};

// Route cho câu hỏi
router.get('/template_docx', (req, res) => {
	const filename = 'example.demo.docx';
	const filePath = path.join(uploadsDir, 'templates', filename);
	sendFileSafely(res, filePath);
});

router.get('/template_md', (req, res) => {
	const filename = 'example.demo.md';
	const filePath = path.join(uploadsDir, 'templates', filename);
	sendFileSafely(res, filePath);
});

router.get('/template_txt', (req, res) => {
	const filename = 'example.demo.txt';
	const filePath = path.join(uploadsDir, 'templates', filename);
	sendFileSafely(res, filePath);
});

router.get('/template_excel', (req, res) => {
	const filename = 'example.demo.xlsx';
	const filePath = path.join(uploadsDir, 'templates', filename);
	sendFileSafely(res, filePath);
});

module.exports = router;
