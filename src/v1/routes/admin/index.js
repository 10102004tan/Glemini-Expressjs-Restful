'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

router.post('/user/update-status',accessController.updateStatus);

//TEMPLATE
router.use('/template', require('./template'));

module.exports = router;