const exerciseModel = require('../models/exercise.model');
const { BadRequestError } = require('../cores/error.repsone');

class ExerciseService {
    async detailExercise({ id }) {
        const exercise = await exerciseModel.findById(id)
            .populate([
                {
                    path: 'quiz_id',
                    select: 'quiz_name quiz_thumb'
                },
                {
                    path: 'classroom_id',
                    model: 'Classroom',
                    select: 'class_name'
                },
                {
                    path: 'result_ids',
                    populate: {
                        path: 'user_id',
                        model: 'User',
                        select: 'user_fullname user_avatar user_email'
                    }
                }
            ]);

        if (!exercise) {
            throw new BadRequestError("Don't have exercise in exercise!");
        }

        return exercise;
    }
}

module.exports = new ExerciseService();
