const schoolModels = require('../models/school.model');
const defaultSchools = require('../configs/school.config');
const { BadRequestError } = require('../cores/error.repsone');
class SchoolService {
	async initialize() {
		try {
			const count = await schoolModels.countDocuments();

			if (count === 0) {
				await schoolModels.insertMany(defaultSchools);
				console.log('Default schools have been added.');
			}
		} catch (error) {
			console.error('Error initializing subjects:', error);
		}
	}

	// Hàm lấy tất cả subjects
	async getAllSchools() {
		const schools = await schoolModels.find();
		if (!schools) {
			throw new BadRequestError('Schools not found');
		}
		return schools;
	}
}

module.exports = new SchoolService();
