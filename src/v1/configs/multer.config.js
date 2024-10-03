'use strict';

const multer = require('multer');

const uploadMemory = multer({
    storage: multer.memoryStorage(),
});

const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './src/v1/uploads'); 
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    }),
});

module.exports = {
    uploadMemory,
    uploadDisk,
};