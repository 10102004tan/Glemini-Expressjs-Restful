'use strict';

const express = require('express');
const { type } = require('os');
const { asynHandler } = require('../auths/utils');
const router = express.Router();
const routeAccess = require('./access');

router.use('/api/v1/', require('./upload'));
router.use('/api/v1/', routeAccess);
router.get('/', (req, res,next) => {
    res.send({
        message: 'It works!',
        metadata: []
    })
});



module.exports = router;