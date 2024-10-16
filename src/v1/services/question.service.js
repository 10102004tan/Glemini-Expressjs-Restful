const { BadRequestError } = require('../cores/error.repsone');
const answerModel = require('../models/answer.model');
const questionModel = require('../models/question.model');
const { url } = require('../configs/url.response.config');
class QuestionService {
	async create(body) {
		// console.log(body);
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

		const promises = body.question_answer_ids.map(async (answer, index) => {
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

		// console.log('update');
		// console.log(questionAnswerIds);
		// console.log(correctAnswerIds);

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

	async getQuestionsById({ question_id }) {
		const question = await questionModel
			.findById(question_id)
			.populate('question_answer_ids')
			.exec(); // Sử dụng exec để truy vấn

		if (!question) {
			throw new BadRequestError('Questions not found');
		}

		const result = question.question_answer_ids.map((answer) => {
			if (question.question_answer_ids.length > 0) {
				if (question.correct_answer_ids.includes(answer._id)) {
					return {
						...answer._doc,
						correct: true,
					};
				}
				return {
					...answer._doc,
					correct: false,
				};
			}
		});
		const data = {
			...question._doc,
			question_answer_ids: result,
		};
		console.log(data);
		return data;
	}

	async update(question) {
		console.log(question);
		const questionUpdate = await questionModel.findOneAndUpdate(
			{ _id: question._id },
			{
				question_excerpt: question.question_excerpt,
				question_description: question.question_description,
				question_image: question.question_image,
				question_audio: question.question_audio,
				question_video: question.question_video,
				question_point: question.question_point,
				question_time: question.question_time,
				question_explanation: question.question_explanation,
				question_type: question.question_type,
			}
		);

		if (!questionUpdate) {
			return BadRequestError('Update question failed');
		}

		// Delete all old answers
		const deleteAnswers = await answerModel.deleteMany({
			_id: { $in: questionUpdate.question_answer_ids },
		});

		// create new answers
		const questionAnswerIds = [];
		const correctAnswerIds = [];

		const promises = question.question_answer_ids.map(
			async (answer, index) => {
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
			}
		);

		// wait for all promises to resolve
		await Promise.all(promises);

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

	async uploadQuestionImages(req, res) {
		// console.log(req.file);
		if (!req.file) {
			return BadRequestError('File is required');
		}
		const imageUrl = url + `uploads/questions/${req.file.filename}`;
		return imageUrl;
	}
}

module.exports = new QuestionService();
