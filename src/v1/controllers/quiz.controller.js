'use strict';
import { CREATED } from '../cores/success.response';
import QuizService from '../services/quiz.service';
class QuizController {
	createQuiz = async (req, res) => {
		try {
			return new CREATED({
				message: 'Quiz created successfully',
				metadata: await QuizService.createQuiz(req.body),
			});
		} catch (error) {
			next(error);
		}
	};
}
