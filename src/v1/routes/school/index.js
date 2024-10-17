'use strict';

const express = require('express');
const route = express.Router();

route.get('/', (req,res)=>{
    res.send({
        message: 'It works!',
        metadata: [
            {
                value:"School 1",
                key:1
            },
            {
                value:"School 2",
                key:2
            },
            {
                value:"School 3",
                key:3
            },
        ],
    })
});

module.exports = route;