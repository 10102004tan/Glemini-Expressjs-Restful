const { BadRequestError } = require('../cores/error.repsone');
const answerModel = require('../models/answer.model');
const questionModel = require('../models/question.model');
const UploadService = require('./upload.service');
class QuestionService {
	async create(body) {
		console.log(body);
		// Kiểm tra đầu vào
		if (
			!body.quiz_id ||
			!Array.isArray(body.question_answer_ids) ||
			body.question_answer_ids.length === 0
		) {
			throw new BadRequestError(
				'Invalid input: Missing required fields or question_answer_ids is not an array.'
			);
		}

		// Tạo câu hỏi
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
			throw new BadRequestError('Create question failed');
		}

		// Tạo câu trả lời
		const questionAnswerIds = [];
		const correctAnswerIds = [];

		const promises = body.question_answer_ids.map(async (answer) => {
			if (!answer.text) {
				// Kiểm tra tính hợp lệ của từng câu trả lời
				throw new BadRequestError('Answer text is required.');
			}

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

		// Chờ tất cả các câu trả lời được tạo xong
		await Promise.all(promises);

		// Cập nhật câu hỏi với danh sách ID câu trả lời
		const updatedQuestion = await questionModel
			.findOneAndUpdate(
				{ _id: question._id },
				{
					question_answer_ids: questionAnswerIds,
					correct_answer_ids: correctAnswerIds,
				},
				{ new: true } // Trả về phiên bản đã cập nhật
			)
			.populate('question_answer_ids');

		if (!updatedQuestion) {
			throw new BadRequestError('Update question failed');
		}

		return updatedQuestion;
	}

	async creates({ questions }) {
		console.log(JSON.stringify(questions, null, 2));
		// thực hiện chèn nhiều câu hỏi cùng lúc dùng insertMany

		// tạo ra các mảng đán án và đán án đúng cho từng câu hỏi
		const wait = questions.map(async (question) => {
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

			await Promise.all(promises);
			// reset lại mảng đáp án và đáp án đúng
			question.question_answer_ids = questionAnswerIds;
			question.correct_answer_ids = correctAnswerIds;
		});

		await Promise.all(wait);

		// console.log(JSON.stringify(questions, null, 2));

		// thực hiện chèn nhiều câu hỏi cùng lúc dùng insertMany
		const createdQuestions = await questionModel.insertMany(questions);

		if (!createdQuestions) {
			throw new BadRequestError('Create questions failed');
		}

		return createdQuestions;
	}

	async getQuestionsByQuizId({ quiz_id }) {
		const questions = await questionModel.find({ quiz_id: quiz_id });
		if (!questions) {
			// console.log('Questions not found');
			throw new BadRequestError('Questions not found');
		}
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
		// console.log(data);
		return data;
	}

	async update(question) {
		// console.log(question);
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

		// console.log('updated Array: ');
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

	async uploadQuestionImages(req, res) {
		// console.log(req.file);
		if (!req.file) {
			return BadRequestError('File is required');
		}

		const uploadUrl = await UploadService.uploadImageFromOneFile({
			path: req.file.path,
			folderName: 'questions/' + req.file.filename,
		});

		return uploadUrl;
	}
}

module.exports = new QuestionService();
