'use strict';

const socketService = require("../services/socket.service");
const roomService = require("../services/room.service");
const { CREATED, OK } = require('../cores/success.response');

class RoomController {
    demo= async (req,res,next) =>{
        const {msg} = req.query;
        _io.emit('chat message', msg);
        return res.json({code:200,msg});
    }

    createRoom = async (req, res) => {
        return new OK({
            message: 'Create room successfully!',
            metadata: await roomService.createRoom(req.body),
        }).send(res);
    };
}

module.exports = new RoomController();