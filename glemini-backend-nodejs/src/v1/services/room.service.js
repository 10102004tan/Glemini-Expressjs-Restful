const roomModel = require('../models/room.model');
const { BadRequestError } = require('../cores/error.repsone');

class RoomService {
    async createRoom({ room_code, quiz_id, user_created_id, user_max, description }) {
        console.log({room_code, quiz_id, user_created_id, user_max, description});
        
        if (!room_code || !quiz_id || !user_created_id || !user_max) {
            throw new BadRequestError('Room code, quiz ID, creator ID and user max are required');
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
            status: 'start'
        },
    );

        return newRoom;
    }
}

module.exports = new RoomService();
