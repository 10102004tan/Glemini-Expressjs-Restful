'use strict';

const cloudinary = require('../configs/cloudinary.config');

/*
1. upload from link url
2. upload from one file
3. upload from multiple files
4. convert format
*/

class UploadService {
    static async uploadImageFromUrl({ url, folderName = 'products' }) {
        try {
            const rs = await cloudinary.uploader.upload(url, {
                // public_id: 'image',
                folder: folderName
            });

            return rs;
        } catch (error) {
            console.log(error);
        }
    }

    // upload image from local
    static async uploadImageFromOneFile({
        path, folderName = 'products'
    }) {
        try {
            const rs = await cloudinary.uploader.upload(path, {
                folder: folderName
            });

            return {
                url: rs.secure_url,
                thumbnail: await cloudinary.url(rs.public_id, {
                    width: 100,
                    height: 100,
                    crop: 'fill',
                    format: 'jpg'
                }),
            };
        } catch (error) {
            console.log(error);
        }
    }

    // upload multiple images

    static async uploadMultipleImagesFromFiles({
        files,
        folderName = 'products'
    }) {

        try {
            if (!files.length) return;

            const uploadedUrls = [];
            for (const file of files) {
                const rs = await cloudinary.uploader.upload(file.path, {
                    folder: folderName
                });

                uploadedUrls.push({
                    image_url: rs.secure_url,
                    thumb_url: await cloudinary.url(rs.public_id, {
                        width: 100,
                        height: 100,
                        crop: 'fill',
                        format: 'jpg'
                    })
                })

            }
            return uploadedUrls;
        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = UploadService;