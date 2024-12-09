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

	async getListCreatedRoom({ user_created_id, page, limit }) {
		const rooms = await roomModel
			.find({ user_created_id })
			.skip((page - 1) * limit)
			.limit(limit)
			.sort({ createdAt: -1 });

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
					select: 'user_fullname user_avatar user_email',
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
		// Kiểm tra xem số lượng người tham gia vào phòng đã đủ chưa
		if (room.user_join_ids.length >= room.user_max) {
			throw new BadRequestError('Room is full');
		}

		// Kiểm tra nếu người dùng đã tham gia vào phòng
		let check = false;
		room.user_join_ids.forEach((user) => {
			// console.log(user.toString(), user_id.toString());
			if (user.toString() === user_id.toString()) {
				check = true;
				return;
			}
		});

		if (check) {
			throw new BadRequestError('User already joined room');
		}

		room.user_join_ids.push(user_id);
		await room.save();
		return room;
	}

	// Xóa người dùng đã join vào phòng
	async removeUserFromRoom({ room_code, user_id }) {
		const room = await roomModel.findOne({ room_code });
		if (!room) {
			throw new BadRequestError('No room found');
		}
		room.user_join_ids = room.user_join_ids.filter(
			(user) => user.toString() !== user_id.toString()
		);
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

	// Hàm kiểm tra xem số lượng người tham gia vào phòng đã đủ chưa
	async checkUserMax({ room_code }) {
		const room = await roomModel.findOne({ room_code });
		if (!room) {
			throw new BadRequestError('No room found');
		}

		if (room.user_join_ids.length >= room.user_max) {
			return true;
		}
	}

	// Hàm tìm phòng theo mã phòng
	async getRoomByCode({ room_code }) {
		// Tìm tất cả phòng có mã gần đúng với mã phòng
		const room = await roomModel.find({
			room_code: { $regex: new RegExp(room_code, 'i') },
		});

		if (!room) {
			throw new BadRequestError('No room found');
		}
		return room;
	}
}

module.exports = new RoomService();
