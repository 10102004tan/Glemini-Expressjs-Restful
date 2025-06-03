'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const { uploadDisk } = require('../../configs/multer.config');
const uploadController = require('../../controllers/upload.controller');
const router = express.Router();

//
router.post('/upload', uploadDisk.single('file'), uploadController.uploadImageUser);
router.post('/uploads', uploadDisk.array('files'), uploadController.uploadMultipleImagesUser);

/* FILES UPLOAD START */

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
router.get('/questions/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, 'questions', filename);
  sendFileSafely(res, filePath);
});

// Route cho quizzes
router.get('/quizzes/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, 'quizzes', filename);
  sendFileSafely(res, filePath);
});

/* FILES UPLOAD END */

module.exports = router;
