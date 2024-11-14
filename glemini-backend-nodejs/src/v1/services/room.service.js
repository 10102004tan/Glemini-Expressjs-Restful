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

	async updateRoom({ room_code, status, joined_users }) {
		const room = await roomModel.findOne({ room_code });
		if (!room) {
			throw new BadRequestError('No room found');
		}

		// Cập nhật trạng thái
		if (status) {
			room.status = status;
		}

		// Nếu có danh sách người dùng đã tham gia vào phòng
		if (joined_users) {
			room.user_join_ids = joined_users;
		}

		await room.save();
		return room;
	}

	async detailRoom({ id }) {
		const room = await roomModel.findById(id).populate([
			{
				path: 'quiz_id',
				select: 'quiz_name quiz_thumb',
			},
			{
				path: 'result_ids',
				populate: {
					path: 'user_id',
					model: 'User',
					select: 'user_fullname user_avatar',
				},
			},
		]);

		if (!room) {
			throw new BadRequestError("Don't have report in room!");
		}

		return room;
	}

	// Hàm thêm người dùng đã join vào phòng
	async addUserToRoom({ room_code, user_id }) {
		const room = await roomModel.findOne({ room_code });
		if (!room) {
			throw new BadRequestError('No room found');
		}
		room.user_ids.push(user_id);
		await room.save();
		return room;
	}

	// Hàm kiểm tra người dùng đã tham gia vào phòng chơi chưa
	async checkJoinedUser({ user_id, room_code }) {
		const room = await roomModel.findOne({ room_code });

		if (!room) {
			throw new BadRequestError('No room found');
		}

		let check = false;
		room.user_join_ids.forEach((user) => {
			if (user.toString() === user_id.toString()) {
				check = true;
				return;
			}
		});

		return check;
	}
}

module.exports = new RoomService();
