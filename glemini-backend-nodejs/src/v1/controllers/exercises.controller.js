const exerciseService = require('../services/exercises.service');
const { CREATED, OK } = require('../cores/success.response');

class ExerciseController {
  async detailExercise(req, res) {
    const exercise = await exerciseService.detailExercise(req.body);
    return new OK({
      message: 'Get detail exercise successfully!',
      metadata: exercise,
    }).send(res);
  }
}

module.exports = new ExerciseController();
