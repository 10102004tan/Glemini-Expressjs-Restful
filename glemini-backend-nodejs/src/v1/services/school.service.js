const schoolModels = require('../models/school.model');
const defaultSchools = require('../configs/school.config');
const { BadRequestError } = require('../cores/error.repsone');
const schoolModel = require('../models/school.model');
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

	// filter list school
	async filter({keyword,page=0,limit=20,provinceId,districtId}) {
		const query = {};
		if (keyword) {
			query.school_name = { $regex: keyword, $options: 'i' };
		}
		if (provinceId) {
			query.province = provinceId;
		}
		if (districtId) {
			query.district = districtId;
		}
		
		// get info province_name and district_name, if province not have, get all

		return await schoolModel.find(query).populate('province').populate('district').skip(page * limit).limit(limit).sort({school_name:1}).lean();
		// return await schoolModel.aggregate([
		// 	{
		// 		$match: query
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: 'provinces',
		// 			localField: 'province',
		// 			foreignField: '_id',
		// 			as: 'province'
		// 		},
		// 		$lookup: {
		// 			from: 'districts',
		// 			localField: 'district',
		// 			foreignField: '_id',
		// 			as: 'district'
		// 		}
		// 	},
		// 	// limit and skip
		// 	{
		// 		$skip: page * limit
		// 	},
		// 	{
		// 		$limit: limit
		// 	},
		// 	// sort
		// 	{
		// 		$sort: { createdAt: 1 }
		// 	}
		// ]);
	}
}

module.exports = new SchoolService();

