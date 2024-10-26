"use strict";
const { CREATED, OK } = require("../cores/success.response");
const quizService = require("../services/quiz.service");

class QuizController {
  createQuiz = async (req, res) => {
    return new CREATED({
      message: "Quiz created successfully",
      metadata: await quizService.createQuiz(req.body),
    }).send(res);
  };

  getQuizByUser = async (req, res) => {
    return new OK({
      message: "Quiz fetched successfully",
      metadata: await quizService.getQuizByUser(req.body),
    }).send(res);
  };

  getQuizDetails = async (req, res) => {
    return new OK({
      message: "Quiz fetched successfully",
      metadata: await quizService.getQuizDetails(req.body),
    }).send(res);
  };

  getQuestionsByQuiz = async (req, res) => {
    return new OK({
      message: "Questions fetched successfully",
      metadata: await quizService.getQuestionsByQuiz(req.body),
    }).send(res);
  };

	getQuizzesBySubjectPublished = async (req, res) => {
		return new OK({
			message: 'Quizzes fetched successfully',
			metadata: await quizService.getQuizzesBySubjectIdPublished(
				req.body
			),
		}).send(res);
	};

	getQuizzesBanner = async (req, res) => {
		return new OK({
			message: 'Quizzes fetched successfully',
			metadata: await quizService.getQuizzesBanner(),
		}).send(res);
	};


	getQuizzesBanner = async (req, res) => {
		return new OK({
			message: 'Quizzes fetched successfully',
			metadata: await quizService.getQuizzesBanner(),
		}).send(res);
	};

	search = async (req, res) => {
		return new OK({
			message: 'Search successfully',
			metadata: await quizService.search(req.body),
		}).send(res);
	};

  deleteQuiz = async (req, res) => {
    return new OK({
      message: "Quiz deleted successfully",
      metadata: await quizService.deleteQuiz(req.body),
    }).send(res);
  };

  updateQuiz = async (req, res) => {
    return new OK({
      message: "Quiz updated successfully",
      metadata: await quizService.updateQuiz(req.body),
    }).send(res);
  };

  uploadQuiz = async (req, res) => {
    return new OK({
      message: "Quiz uploaded successfully",
      metadata: await quizService.uploadQuiz(req, res),
    }).send(res);
  };

	uploadDoc = async (req, res) => {
		return new OK({
			message: 'Document uploaded successfully',
			metadata: await quizService.uploadDoc(req, res),
		}).send(res);
	};

	uploadMd = async (req, res) => {
		return new OK({
			message: 'Document uploaded successfully',
			metadata: await quizService.uploadMd(req, res),
		}).send(res);
	};

	getDocsTemplate = async (req, res) => {
		return new OK({
			message: 'Docs fetched successfully',
			metadata: await quizService.getDocsTemplate(req, res),
		}).send(res);
	};

	filterQuizzes = async (req, res) => {
		return new OK({
			message: 'Quizzes fetched successfully',
			metadata: await quizService.filterQuizzes(req.body),
		}).send(res);
	};

	geminiCreateQuestionByPrompt = async (req, res) => {
		return new OK({
			message: 'Question created successfully',
			metadata: await quizService.geminiCreateQuestionByPrompt(req.body),
		}).send(res);
	};

	geminiCreateQuestionByPromptStream = async (req, res) => {
		// Thiết lập header cho stream
		res.setHeader('Content-Type', 'text/event-stream');
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Connection', 'keep-alive');

		const { prompt } = req.body;

		if (!prompt) {
			res.write('data: {"error": "Prompt is required"}\n\n');
			res.end();
			return;
		}

		try {
			// Gọi hàm từ service để thực hiện stream dữ liệu
			await quizService.geminiCreateQuestionByPromptStream(req, res);

			// Khi hàm xử lý xong, đảm bảo gửi tín hiệu kết thúc stream
			res.write('data: [END]\n\n');
			res.end();
		} catch (err) {
			// Trả về lỗi nếu có sự cố
			res.write(`data: {"error": "${err.message}"}\n\n`);
			res.end();
		}
	};
}

module.exports = new QuizController();
