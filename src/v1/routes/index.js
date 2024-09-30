'use strict';

const express = require('express');
const { type } = require('os');
const { asynHandler } = require('../auths/utils');
const router = express.Router();
const routeAccess = require('./access');
const routeResult = require('./result');

router.use('/api/v1/', routeAccess);
router.use('/api/v1/', routeResult);

router.get('/', (req, res,next) => {
    res.send({
        message: 'It works!',
        metadata: []
    })
});



module.exports = router;