'use strict';

const socketService = require("../services/socket.service");

class RoomController {
    demo= async (req,res,next) =>{
        const {msg} = req.query;
        _io.emit('chat message', msg);
        return res.json({code:200,msg});
    }
}

module.exports = new RoomController();