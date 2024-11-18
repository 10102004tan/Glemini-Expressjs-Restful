'use strict';

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

	async detailRoom(req, res) {
		const room = await roomService.detailRoom(req.body);
		return new OK({
			message: 'Get detail room successfully!',
			metadata: room,
		}).send(res);
	}

	async addUserToRoom(req, res) {
		const room = await roomService.addUserToRoom(req.body);
		return new OK({
			message: 'Add user to room successfully!',
			metadata: room,
		}).send(res);
	}

	async checkJoinedUser(req, res) {
		const check = await roomService.checkJoinedUser(req.body);
		return new OK({
			message: 'Check user joined room successfully!',
			metadata: check,
		}).send(res);
	}

	async removeUserFromRoom(req, res) {
		const check = await roomService.removeUserFromRoom(req.body);
		return new OK({
			message: 'Remove user from room successfully!',
			metadata: check,
		}).send(res);
	}
}

module.exports = new RoomController();
