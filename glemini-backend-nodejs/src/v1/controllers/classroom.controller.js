const classroomService = require('../services/classroom.service');
const { CREATED, OK } = require('../cores/success.response');

class ClassroomController {
  // API tạo lớp học mới
  async createClassroom(req, res, next) {
    const classroom = await classroomService.createClassroom(req.body);
    return new OK({
      message: 'Created new classroom successfully!',
      metadata: classroom,
    }).send(res);
  }

  async deleteClassroom(req, res, next) {
    const { classroomId } = req.params;
    const data = await classroomService.deleteClassroom(classroomId);
    return new OK({
      message: 'Delete this classroom successfully!',
      metadata: data,
    }).send(res);
  }

  // API lấy thông tin lớp học theo ID
  async getClassroomById(req, res, next) {
    const classroom = await classroomService.getClassroomById(req.body);
    return new OK({
      message: 'Fetch data classrooms successfully!',
      metadata: classroom,
    }).send(res);
  }

  async getClassroomsByTeacherId(req, res, next) {
    const classrooms = await classroomService.getClassroomsByTeacherId(req.body);
    return new OK({
      message: 'Fetch data classrooms successfully!',
      metadata: classrooms,
    }).send(res);
  }

  async getClassroomsByStudentId(req, res, next) {
    const classrooms = await classroomService.getClassroomsByStudentId(req.body);
    return new OK({
      message: 'Fetch data classrooms by student successfully!',
      metadata: classrooms,
    }).send(res);
  }

  // API thêm học sinh vào lớp học
  uploadExcel = async (req, res) => {
    return new OK({
      message: 'List student uploaded successfully',
      metadata: await classroomService.uploadExcel(req, res),
    }).send(res);
  };

  async removeStudent(req, res, next) {
    const { classroomId, studentId } = req.params;
    const result = await classroomService.removeStudentFromClass(classroomId, studentId);
    return new OK({
      message: 'Deleted student from classroom successfully',
      metadata: result,
    }).send(res);
  }

  async addStudent(req, res, next) {
    const result = await classroomService.addStudent(req.body);
    return new OK({
      message: 'Add student for classroom successfully',
      metadata: result,
    }).send(res);
  }

  async addQuizToClassroom(req, res, next) {
    const result = await classroomService.addQuizToClassroom(req.body);
    return new OK({
      message: 'Add quiz to classroom successfully',
      metadata: result,
    }).send(res);
  }

  async notifyStudentWhenTeacherCreateRoom(req, res, next) {
    return new OK({
      message: 'Remove quiz from classroom successfully',
      metadata: await classroomService.notifyStudentWhenTeacherCreateRoom(req.body),
    }).send(res);
  }
}

module.exports = new ClassroomController();
