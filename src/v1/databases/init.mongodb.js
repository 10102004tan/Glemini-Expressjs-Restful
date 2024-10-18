'use strict';
const mongoose = require('mongoose');
const { host, port, name } = require('../configs/mongodb.config');
const colors = require('../configs/colors.config');
const subjectService = require('../services/subject.service');
class Database {
	constructor() {
		this.connect();
	}

	connect() {
		const connectString = `mongodb://${host}:${port}/${name}`;
		// rconst connectString = `mongodb+srv://gleminidev:AMpX6YOVs9o2jXKL@gleminidevdb.zhvjv.mongodb.net/?retryWrites=true&w=majority&appName=gleminiDevDB`;
		mongoose
			.connect(connectString)
			.then(() => {
				console.log(
					colors.bg.green,
					`MongoDB ${name} connection successful ☕︎`,
					colors.reset
				);
				// Khởi tạo dữ liệu mẫu
				subjectService.initialize();
				console.log();
			})
			.catch((err) => {
				console.log(
					colors.fg.white,
					colors.bg.red,
					'Error while connecting to database: ',
					err.message,
					colors.reset
				);
			});
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

const instanceDB = Database.getInstance();
module.exports = instanceDB;
