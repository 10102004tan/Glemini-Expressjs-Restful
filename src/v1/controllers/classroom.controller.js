const classroomService = require('../services/classroom.service');
const {CREATED, OK} = require('../cores/success.response');


class ClassroomController {
    // API tạo lớp học mới
    async createClassroom(req, res, next) {

        const classroom = await classroomService.createClassroom(req.body);
        return new OK({
            message: 'Created new classroom successfully!',
            metadata: classroom,
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
			metadata: await classroomService.uploadExcel(req,res),
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
}

module.exports = new ClassroomController();
