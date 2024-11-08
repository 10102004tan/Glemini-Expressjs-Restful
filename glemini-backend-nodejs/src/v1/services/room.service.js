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

    async detailRoom({ id }) {
        const room = await roomModel.findById(id)
            .populate([
                {
                    path: 'quiz_id',
                    select: 'quiz_name quiz_thumb'
                },
                {
                    path: 'result_ids',
                    populate: {
                        path: 'user_id',
                        model: 'User',
                        select: 'user_fullname user_avatar'
                    }
                },
            ]);

        if (!room) {
            throw new BadRequestError("Don't have report in room!");
        }

        return room;
    }
}

module.exports = new RoomService();
