'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const accessController = require('../../controllers/access.controller');
const {authentication} = require('../../auths');

router.post('/signup',asynHandler(accessController.signup));
router.post('/login',asynHandler(accessController.login));

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('/me', asynHandler((req, res) => {
    const user = req.user;
    res.json(user);
}))
router.post('/logout', asynHandler(accessController.logout));
router.post('/change-password', asynHandler(accessController.changePassword));
router.post('/refresh', asynHandler(accessController.refresh));








module.exports = router;