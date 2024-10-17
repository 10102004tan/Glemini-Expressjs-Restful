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
}

module.exports = new QuizController();
