const subjectModel = require('../models/subject.model');
const defaultSubjects = require('../configs/subject.config');
const { BadRequestError } = require('../cores/error.repsone');
class SubjectService {
  // Hàm kiểm tra và tạo dữ liệu mặc định
  async initialize() {
    try {
      // Kiểm tra xem đã có dữ liệu trong bảng Subject chưa
      const count = await subjectModel.countDocuments();

      if (count === 0) {
        // Nếu chưa có dữ liệu, thêm các subject mặc định
        await subjectModel.insertMany(defaultSubjects);
        console.log('Default subjects have been added.');
      }
    } catch (error) {
      console.error('Error initializing subjects:', error);
    }
  }

  // Hàm lấy tất cả subjects
  async getAllSubjects() {
    const subjects = await subjectModel.find();
    if (!subjects) {
      throw new BadRequestError('Subjects not found');
    }
    return subjects;
  }
}

module.exports = new SubjectService();
