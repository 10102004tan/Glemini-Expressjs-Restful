'use strict';

const express = require('express');
const userController = require('../../../controllers/user.controller');

const router = express.Router();

router.post('/teachers', userController.getAllTeacher);

module.exports = router;
