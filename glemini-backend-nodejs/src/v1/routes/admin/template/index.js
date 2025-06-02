'use strict';

const express = require('express');
const templateController = require('../../../controllers/template.controller');
const router = express.Router();

router.post('/', templateController.createTemplate);

module.exports = router;
