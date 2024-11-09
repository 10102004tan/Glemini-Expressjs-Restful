'use strict';

const socketService = require('../services/socket.service');
const roomService = require('../services/room.service');
const { CREATED, OK } = require('../cores/success.response');

class RoomController {
	demo = async (req, res, next) => {
		const { msg } = req.query;
		_io.emit('chat message', msg);
		return res.json({ code: 200, msg });
	};

	createRoom = async (req, res) => {
		return new OK({
			message: 'Create room successfully!',
			metadata: await roomService.createRoom(req.body),
		}).send(res);
	};

	getListCreatedRoom = async (req, res) => {
		return new OK({
			message: 'Get list created room successfully!',
			metadata: await roomService.getListCreatedRoom(req.body),
		}).send(res);
	};

	getRoomDetail = async (req, res) => {
		return new OK({
			message: 'Get result successfully!',
			metadata: await roomService.getRoomDetail(req.body),
		}).send(res);
	};

	updateRoom = async (req, res) => {
		return new OK({
			message: 'Update room successfully!',
			metadata: await roomService.updateRoom(req.body),
		}).send(res);
	};
}

module.exports = new RoomController();
