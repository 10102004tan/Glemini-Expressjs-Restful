'use strict';
const ResultModel = require('../models/result.model');
const QuizModel = require('../models/quiz.model');
const QuestionModel = require('../models/question.model');
const exerciseModel = require('../models/exercise.model');
const RoomModel = require('../models/room.model');
const { BadRequestError } = require('../cores/error.repsone');
const classroomModel = require('../models/classroom.model');
const roomModel = require('../models/room.model');

class ResultService {
	static async saveQuestion({
		exercise_id,
		room_id,
		user_id,
		quiz_id,
		question_id,
		answer,
		correct,
		score,
	}) {
		const query = {
			user_id,
			quiz_id,
		};

		// Thêm `type` vào truy vấn
		if (exercise_id) {
			query.exercise_id = exercise_id;
			query.type = 'exercise';
		} else if (room_id) {
			query.room_id = room_id;
			query.type = 'room';
		} else {
			query.type = 'publish';
		}

		let result = await ResultModel.findOne(query);

		if (!result) {
			// Tạo mới `result` nếu chưa có
			result = new ResultModel({
				user_id,
				quiz_id,
				status: 'doing',
				result_questions: [],
				type: query.type, // Thiết lập `type` theo loại
			});

			if (exercise_id) {
				result.exercise_id = exercise_id;
			}
			if (room_id) {
				result.room_id = room_id;
			}

			await result.save(); // Lưu `result` mới

			// Nếu có `exercise_id`, thêm `result._id` vào `exercise.result_ids`
			if (exercise_id) {
				await exerciseModel.findByIdAndUpdate(
					exercise_id,
					{ $addToSet: { result_ids: result._id } },
					{ new: true, runValidators: true }
				);
			}

			// Save result to room
			if (room_id) {
				await roomModel.findByIdAndUpdate(
					{ _id: room_id },
					{ $addToSet: { result_ids: result._id } }, // Ensures result_id is added only once
					{ new: true, runValidators: true }
				);
			}
		} else {
			// Nếu đã có `result`, cập nhật trạng thái và xóa câu hỏi nếu đã hoàn thành
			if (result.status === 'completed') {
				result.status = 'doing';
				result.result_questions = []; // Xóa câu hỏi cũ
			}
		}

		// Thêm câu trả lời mới vào `result.result_questions`
		result.result_questions.push({
			question_id,
			answer,
			correct,
			score,
		});

		await result.save(); // Lưu `result` đã cập nhật

		return result;
	}


	static async completeQuiz({ exercise_id, room_id, user_id, quiz_id }) {
		const query = {
			user_id,
			quiz_id,
			type: ''
		};
	
		if (exercise_id) {
			query.exercise_id = exercise_id;
			query.type = 'exercise';
		} else if (room_id) {
			query.room_id = room_id;
			query.type = 'room';
		} else {
			query.type = 'publish';
		}
    
		// Cập nhật lại trạng thái kết thúc cho quiz đó
		const result = await ResultModel.findOneAndUpdate(
			query,
			{ status: 'completed' },
			{ new: true, runValidators: true }
		);


		// Xóa người dùng ra khỏi phòng
		if (room_id) {
			await roomModel.findByIdAndUpdate(
				{ _id: room_id },
				{ $pull: { user_join_ids: user_id } }
			);
		}

		if (!result) {
			throw new BadRequestError('Result not found');
		}
	
		// Update quiz play count
		await QuizModel.findOneAndUpdate(
			{ _id: quiz_id },
			{ $inc: { quiz_turn: 1 } },
			{ new: true, runValidators: true }
		);
	
		return result;
	}
	

	static async review({ user_id, exercise_id, quiz_id, room_id, type }) {
		const query = {
            user_id,
            quiz_id,
			type
        };

		if (user_id) {
			query.user_id = user_id;
		}

		if (exercise_id) {
			query.exercise_id = exercise_id;
		}

		if (room_id) {
			query.room_id = room_id;
		}

		const result = await ResultModel.findOne(query)
			.populate({
				path: 'result_questions.question_id',
				model: 'Question',
				populate: {
					path: 'question_answer_ids',
					model: 'Answer',
				},
			})
			.populate({
				path: 'result_questions.answer',
				model: 'Answer',
			});

		if (!result) {
			throw new BadRequestError('Result not found');
		}

		return result;
	}

	static async getResultsByRoomId(roomId, status) {
		if (!['doing', 'completed'].includes(status)) {
			throw new BadRequestError('Invalid status');
		}

		const results = await ResultModel.find({
			room_id: roomId,
			status,
		});

		return results;
	}

	static async updateResultWhileRealtimePlay({
		room_id,
		user_id,
		quiz_id,
		question_id,
		answer,
		correct,
		score,
	}) {
		console.log(room_id);
		// Kiểm tra tham số đầu vào
		if (!user_id || !quiz_id || !question_id) {
			throw new Error('Thiếu tham số bắt buộc');
		}

		const query = { user_id, quiz_id };
		if (room_id) query.room_id = room_id;

		let result = await ResultModel.findOne(query);

		if (!result) {
			result = new ResultModel({
				user_id,
				quiz_id,
				status: 'doing',
				result_questions: [],
			});

			if (room_id) {
				result.room_id = room_id;
			}
		}

		// Kiểm tra và cập nhật câu trả lời trùng lặp
		const existingAnswerIndex = result.result_questions.findIndex(
			(q) => q.question_id.toString() === question_id.toString()
		);
		if (existingAnswerIndex !== -1) {
			result.result_questions[existingAnswerIndex] = {
				question_id,
				answer,
				correct,
				score,
				answered_at: new Date(),
			};
		} else {
			result.result_questions.push({
				question_id,
				answer,
				correct,
				score,
				answered_at: new Date(),
			});
		}

		if (room_id) {
			// Save result to room
			await roomModel.findByIdAndUpdate(
				{ _id: room_id },
				{ $addToSet: { result_ids: result._id } }, // Ensures result_id is added only once
				{ new: true, runValidators: true }
			);
		}

		await result.save();
		return result;
	}

	static async getUserRank({ room_id, user_id, quiz_id }) {
		const result = await ResultModel.findOne({
			room_id,
			user_id,
			quiz_id,
		}).populate('user_id');

		if (!result) {
			throw new BadRequestError('Result not found');
		}

		// Lấy điểm số của user hiện tại
		const userScore = result.result_questions.reduce((acc, q) => {
			return q.correct ? acc + q.score : acc;
		}, 0);

		return { ...result._doc, userScore };
	}
	// Student  in activity
	static async getResultsByUserId({ userId }) {
		if (!userId) {
			throw new BadRequestError('User ID is required');
		}

		const results = await ResultModel.find({ user_id: userId })
			.populate({
				path: 'quiz_id',
				select: 'quiz_name quiz_thumb user_id',
				populate: {
					path: 'user_id',
					select: 'user_fullname',
				},
			})
			.populate({
				path: 'result_questions.question_id',
				model: 'Question',
				populate: {
					path: 'question_answer_ids',
					model: 'Answer',
				},
			})
			.populate({
				path: 'exercise_id',
				select: 'name',
			})
			.populate({
				path: 'room_id',
				select: 'room_code',
			});

		// Nhóm các kết quả theo trạng thái
		const categorizedResults = {
			completed: [],
			doing: [],
		};

		for (const result of results) {
			const quiz = result.quiz_id;
			if (quiz) {
				const questionCount = await QuestionModel.countDocuments({
					quiz_id: quiz._id,
				});
				quiz.questionCount = questionCount;

				const resultWithQuestionCount = {
					...result.toObject(),
					quiz_id: {
						...quiz.toObject(),
						questionCount,
					},
				};

				// Phân loại kết quả
				if (result.status === 'completed') {
					categorizedResults.completed.push(resultWithQuestionCount);
				} else {
					categorizedResults.doing.push(resultWithQuestionCount);
				}
			}
		}

		return categorizedResults;
	}

	// Teacher in report
	static async getReportResults({
		userId,
		limit = 5,
		page = 1,
		identifier,
		class_name,
		type,
		sortOrder = 'oldest',
	}) {
		if (!userId) {
			throw new BadRequestError('User ID is required');
		}

		try {
			const queryOptions = {};
			if (identifier)
				queryOptions.identifier = { $regex: identifier, $options: 'i' };
			if (class_name)
				queryOptions.class_name = { $regex: class_name, $options: 'i' };
			if (type) queryOptions.type = type;

			// Fetch rooms created by the user, filtering for completed results
			const rooms = await RoomModel.find({
				user_created_id: userId,
			}).populate({
				path: 'result_ids',
				match: { status: 'completed' },
				model: 'Result',
				populate: [
					{
						path: 'user_id',
						select: 'user_fullname user_avatar user_email',
					},
					{ path: 'quiz_id', select: 'quiz_name quiz_thumb' },
					{
						path: 'result_questions.question_id',
						select: 'question_excerpt question_description question_image question_point question_explanation question_answer_ids',
						populate: {
							path: 'question_answer_ids',
							model: 'Answer',
							select: 'text image',
						},
					},
					{ path: 'result_questions.answer', select: 'text image' },
				],
			});

			// Fetch classrooms where the user is the teacher, filtering for completed results
			const classrooms = await classroomModel
				.find({ user_id: userId })
				.populate({
					path: 'exercises',
					populate: {
						path: 'result_ids',
						match: { status: 'completed' },
						model: 'Result',
						populate: [
							{
								path: 'user_id',
								select: 'user_fullname user_avatar user_email',
							},
							{ path: 'quiz_id', select: 'quiz_name quiz_thumb' },
							{
								path: 'result_questions.question_id',
								select: 'question_excerpt question_description question_image question_point question_explanation question_answer_ids',
								populate: {
									path: 'question_answer_ids',
									model: 'Answer',
									select: 'text image',
								},
							},
							{
								path: 'result_questions.answer',
								select: 'text image',
							},
						],
					},
				});

			// Process rooms and classrooms into a combined results list
			const allResults = [];

			rooms.forEach((room) => {
				allResults.push({
					id: room._id,
					type: 'room',
					identifier: room.room_code,
					description: room.description,
					results: room.result_ids,
					createdAt: room.createdAt,
				});
			});

			classrooms.forEach((classroom) => {
				classroom.exercises.forEach((exercise) => {
					allResults.push({
						id: exercise._id,
						type: 'exercise',
						identifier: exercise.name,
						class_name: classroom.class_name,
						subject: classroom.subject.name,
						results: exercise.result_ids,
						createdAt: exercise.createdAt,
					});
				});
			});

			// Apply filtering on combined results
			const filteredResults = allResults.filter((result) => {
				const matchesIdentifier = identifier
					? result.identifier.match(new RegExp(identifier, 'i'))
					: true;
				const matchesClassName = class_name
					? result.class_name &&
						result.class_name.match(new RegExp(class_name, 'i'))
					: true;
				const matchesType = type ? result.type === type : true;
				return matchesIdentifier && matchesClassName && matchesType;
			});

			// Sort results based on createdAt
			if (sortOrder === 'newest') {
				filteredResults.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				); // Newest first
			} else if (sortOrder === 'oldest') {
				filteredResults.sort(
					(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
				); // Oldest first
			}

			// Implement pagination on the filtered and sorted results
			const totalResults = filteredResults.length;
			const paginatedResults = filteredResults.slice(
				(page - 1) * limit,
				page * limit
			);

			return {
				results: paginatedResults,
				totalResults,
				totalPages: Math.ceil(totalResults / limit),
				currentPage: page,
			};
		} catch (error) {
			throw new BadRequestError(error);
		}
	}

	static async overview({ id }) {
		if (!id) {
			throw new BadRequestError("Don't get data overview of a user");
		}

		const result = await ResultModel.findById(id)
			.populate({
				path: 'user_id',
				select: 'user_fullname user_avatar',
			})
			.populate({
				path: 'quiz_id',
				select: 'quiz_name quiz_thumb',
			})
			.populate({
				path: 'result_questions.question_id',
				model: 'Question',
				populate: [
					{
						path: 'question_answer_ids',
						model: 'Answer',
					},
					{
						path: 'correct_answer_ids',
						model: 'Answer',
					},
				],
			})
			.populate({
				path: 'result_questions.answer',
				model: 'Answer',
			});

		if (!result) {
			throw new BadRequestError('Result not found');
		}

		return result;
	}

	static async getRankBoard({ room_id, quiz_id }) {
		const results = await ResultModel.find({
			room_id,
			quiz_id,
		}).populate('user_id');

		if (!results) {
			throw new BadRequestError('Result not found');
		}

		let totalAnswered = 0;
		let correctAnswered = 0;

		const rankBoard = results.map((result) => {
			const userScore = result.result_questions.reduce((acc, q) => {
				return q.correct ? acc + q.score : acc;
			}, 0);

			totalAnswered += result.result_questions.length;
			correctAnswered += result.result_questions.filter(
				(q) => q.correct
			).length;

			return {
				user_id: result.user_id,
				userScore,
			};
		});

		return {
			rank: rankBoard,
			total_answer: totalAnswered,
			correct_answer: correctAnswered,
		};
	}

	static async resetResultRoom({ room_id, user_id }) {
		const result = await ResultModel.findOne({ room_id, user_id });
		if (!result) {
			throw new BadRequestError('Result not found');
		}

		result.status = 'doing';
		result.result_questions = [];
		await result.save();

		return result;
	}
}

module.exports = ResultService;
