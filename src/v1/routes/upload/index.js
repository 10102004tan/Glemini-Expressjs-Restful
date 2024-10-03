'use strict';

const express = require('express');
const router = express.Router();
const {uploadDisk} = require('../../configs/multer.config');


router.post('/upload', uploadDisk.array('file_urls'),(req, res) => {
    res.json({
        message: "Upload successfully",
        file:req.files,
        metadata: req.body
    });
});

module.exports = router;