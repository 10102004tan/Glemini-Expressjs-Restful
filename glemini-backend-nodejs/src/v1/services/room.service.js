const roomModel = require('../models/room.model');
const { BadRequestError } = require('../cores/error.repsone');

class RoomService {
	async createRoom({
		room_code,
		quiz_id,
		user_created_id,
		user_max,
		description,
	}) {
		if (!room_code || !quiz_id || !user_created_id || !user_max) {
			throw new BadRequestError(
				'Room code, quiz ID, creator ID and user max are required'
			);
		}

		const existingRoom = await roomModel.findOne({ room_code });
		if (existingRoom) {
			throw new BadRequestError('Room code already exists');
		}

		const newRoom = await roomModel.create({
			room_code,
			quiz_id,
			user_created_id,
			user_max,
			description,
			status: 'start',
		});

		return newRoom;
	}

	async getListCreatedRoom({ user_created_id }) {
		const rooms = await roomModel.find({ user_created_id });
		if (!rooms) {
			throw new BadRequestError('No room found');
		}
		return rooms;
	}

	async getRoomDetail({ room_code }) {
		const room = await roomModel.findOne({ room_code });
		if (!room) {
			throw new BadRequestError('No room found');
		}

		return room;
	}

	async updateRoom({ room_code, status }) {
		console.log(room_code, status);
		const room = await roomModel.findOne({ room_code });
		if (!room) {
			throw new BadRequestError('No room found');
		}

		room.status = status;
		await room.save();
		return room;
	}
}

module.exports = new RoomService();
