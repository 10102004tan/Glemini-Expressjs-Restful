const exerciseModel = require('../models/exercise.model');
const { BadRequestError } = require('../cores/error.repsone');
const { populate } = require('../models/result.model');

class ExerciseService {
  async detailExercise({ id }) {
    const exercise = await exerciseModel.findById(id).populate([
      {
        path: 'quiz_id',
        select: 'quiz_name quiz_thumb',
      },
      {
        path: 'classroom_id',
        model: 'Classroom',
        select: 'class_name',
        populate: [{
          path: 'subject',
          select: 'name',
          model: 'Subject',
        }, {
          path: 'school',
          select: 'school_name',
          model: 'School',
          populate: [{
            path: 'district',
            model: 'District',
            select: 'district_name',
          }, {
            path: 'province',
            model: 'Province',
            select: 'province_name',
          }]
        }]},
        {
          path: 'result_ids',
          match: { status: 'completed' },
          model: 'Result',
          populate: [
            {
              path: 'user_id',
              model: 'User',
              select: 'user_fullname user_avatar user_email',
            },
            {
              path: 'quiz_id',
              select: 'quiz_name quiz_thumb',
            },
            {
              path: 'result_questions.question_id',
              select:
                'question_excerpt question_description question_type question_image question_point question_explanation question_answer_ids correct_answer_ids',
              populate: [{
                path: 'question_answer_ids',
                model: 'Answer',
                select: 'text image',
              }, {
                path: 'correct_answer_ids',
                model: 'Answer',
                select: 'text image',
              }],
            },
            {
              path: 'result_questions.answer',
              select: 'text image',
              model: 'Answer',
            },
          ],
        },
        ]);


    if (!exercise) {
      throw new BadRequestError("Don't have exercise in exercise!");
    }

    return exercise;
  }
}

module.exports = new ExerciseService();
