const questionController = require('../controllers/question.controller');
const { BadRequestError } = require('../cores/error.repsone');
const answerModel = require('../models/answer.model');
const questionModel = require('../models/question.model');
class QuestionService {
	async create(body) {
		console.log(body);
		// fake quiz id: 66fba5626870c1fb0f276b7a

		const question = await questionModel.create({
			quiz_id: body.quiz_id,
			question_excerpt: body.question_excerpt,
			question_description: body.question_description,
			question_image: body.question_image,
			question_audio: body.question_audio,
			question_video: body.question_video,
			question_point: body.question_point,
			question_time: body.question_time,
			question_explanation: body.question_explanation,
			question_type: body.question_type,
		});

		if (!question) {
			return BadRequestError('Create question failed');
		}

		// create answers
		const questionAnswerIds = [];
		const correctAnswerIds = [];

		const promises = body.answers.map(async (answer, index) => {
			console.log(index);
			const answerData = await answerModel.create({
				text: answer.text,
				image: answer.image,
			});

			if (answerData) {
				questionAnswerIds.push(answerData._id);
				if (answer.correct) {
					correctAnswerIds.push(answerData._id);
				}
			}
		});

		// wait for all promises to resolve
		await Promise.all(promises);

		console.log('update');
		console.log(questionAnswerIds);
		console.log(correctAnswerIds);

		// update question with answer ids
		const updatedQuestion = await questionModel.findOneAndUpdate(
			{ _id: question._id },
			{
				question_answer_ids: questionAnswerIds,
				correct_answer_ids: correctAnswerIds,
			}
		);

		return updatedQuestion;
	}

	async getQuestionsByQuizId({ quiz_id }) {
		const questions = await questionModel.find({ quiz_id: quiz_id });
		return questions;
	}
}

module.exports = new QuestionService();
