'use strict';
const { CREATED, OK } = require('../cores/success.response');
const collectionService = require('../services/collection.service');

class AccessController {
	create = async (req, res, next) => {
		return new CREATED({
			message: 'Collection created successfully',
			metadata: await collectionService.create(req.body),
		}).send(res);
	};

	getCollections = async (req, res, next) => {
		return new OK({
			message: 'Collections fetched successfully',
			metadata: await collectionService.getCollections(req.body),
		}).send(res);
	};

	getCollectionById = async (req, res, next) => {
		return new OK({
			message: 'Collection fetched successfully',
			metadata: await collectionService.getCollectionById(req.body),
		}).send(res);
	};

	addQuizToCollection = async (req, res, next) => {
		return new OK({
			message: 'Quiz added to collection successfully',
			metadata: await collectionService.addQuizToCollection(req.body),
		}).send(res);
	};

	removeQuizFromCollection = async (req, res, next) => {
		return new OK({
			message: 'Quiz removed from collection successfully',
			metadata: await collectionService.removeQuizFromCollection(
				req.body
			),
		}).send(res);
	};

	deleteCollection = async (req, res, next) => {
		return new OK({
			message: 'Collection deleted successfully',
			metadata: await collectionService.deleteCollection(req.body),
		}).send(res);
	};

	updateCollection = async (req, res, next) => {
		return new OK({
			message: 'Collection updated successfully',
			metadata: await collectionService.updateCollection(req.body),
		}).send(res);
	};
}

module.exports = new AccessController();
