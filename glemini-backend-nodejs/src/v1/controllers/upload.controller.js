'use strict';
const UploadService = require('../services/upload.service');
const { OK } = require('../cores/success.response');

class UploadController {
  uploadImageUser = async (req, res, next) => {
    const { file } = req;
    console.log(file.path);
    return new OK({
      message: 'Upload image successfully',
      metadata: await UploadService.uploadImageFromOneFile({
        path: file.path,
        folderName: 'users',
      }),
    }).send(res);
  };

  uploadMultipleImagesUser = async (req, res, next) => {
    const { files } = req;
    return new OK({
      message: 'Upload images successfully',
      metadata: await UploadService.uploadMultipleImagesFromFiles({
        files,
        folderName: 'users',
      }),
    }).send(res);
  };
}

module.exports = new UploadController();
