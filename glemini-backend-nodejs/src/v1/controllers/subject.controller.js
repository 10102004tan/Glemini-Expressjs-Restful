'use strict';

const { OK } = require('../cores/success.response');
const subjectService = require('../services/subject.service');

class SubjectController {
	getSubjects = async (req, res) => {
		return new OK({
			message: 'Subjects fetched successfully',
			metadata: await subjectService.getAllSubjects(),
		}).send(res);
	};
	
	getSubject = async (req, res) => {
		return new OK({
			message: 'Subject fetched successfully',
			metadata: await subjectService.getOneSubject(req.body),
		}).send(res);
	};
}

module.exports = new SubjectController();
