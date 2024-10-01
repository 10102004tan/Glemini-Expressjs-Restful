const express = require('express');
const router = express.Router();
const upload = require('../../configs/multer.config');

router.post('/upload', upload.single('myFile'), (req, res) => {
	try {
		res.send('File uploaded successfully!');
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
