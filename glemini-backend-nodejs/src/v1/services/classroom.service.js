const classroomModel = require('../models/classroom.model');
const studentModel = require('../models/student.model');
const quizModel = require('../models/quiz.model');
const schoolModel = require('../models/school.model');
const subjectModel = require('../models/subject.model');
const exerciseModel = require('../models/exercise.model');
const AccessService = require('../services/access.service');
const userModel = require('../models/user.model');
const { BadRequestError } = require('../cores/error.repsone');
const fs = require('fs');
const xlsx = require('xlsx');

class ClassroomService {

    // Hàm lấy lớp theo học sinh
    async getClassroomsByStudentId({user_id}) {

        const classrooms = await studentModel.findById(user_id)
            .populate({
                path: 'classroom_ids',
                populate: [
                    {
                        path: 'user_id',
                        select: 'user_fullname user_email user_avatar',
                    },
                    {
                        path: 'exercises',
                        select: 'quiz_id'
                    },
                    {
                        path: 'school',
                        select: 'school_name address school_code',
                    },
                    {
                        path: 'subject',
                        select: 'name',
                    },
                ],
            });

        return classrooms.classroom_ids;
    }

    // hàm chia bộ quizz vào lớp
    async addQuizToClassroom({ name, classroomId, quizId, start, deadline }) {
        const quizExists = await quizModel.exists({ _id: quizId });
        if (!quizExists) throw new BadRequestError('Quiz không tồn tại');

        const classroom = await classroomModel.findById(classroomId);
        if (!classroom) throw new BadRequestError('Classroom không tồn tại');

        const existingExercise = await exerciseModel.findOne({
            quiz_id: quizId,
            classroom_id: classroomId
        });
        if (existingExercise) {
            throw new BadRequestError('Quiz đã tồn tại trong lớp học');
        }

        const newExercise = await exerciseModel.create({
            name: name,
            quiz_id: quizId,
            classroom_id: classroomId,
            date_start: start || new Date(),
            date_end: deadline
        });

        classroom.exercises.push(newExercise._id);
        await classroom.save();

        await classroom.populate('exercises');
        return classroom;
    }

    // Hàm tạo lớp học mới
    async createClassroom(classData) {
        const { class_name, user_id, school_id, subject_id, students } = classData;

        const school = await schoolModel.findById(school_id);
        if (!school) throw new BadRequestError('School not found');

        const subject = await subjectModel.findById(subject_id);
        if (!subject) throw new BadRequestError('Subject not found');

        const teacher = await userModel.findById(user_id);

        const classroom = await classroomModel.create({
            class_name,
            exercises: [],
            school: school._id,
            subject: subject._id,
            user_id: teacher._id,
            students: students || [],
        });

        return classroom;
    }

    // Hàm lấy thông tin lớp học
    async getClassroomById(classroomId) {
        const classroom = await classroomModel.findById(classroomId)
            .populate('exercises')
            .populate('school')
            .populate('subject')
            .populate('students');

        if (!classroom) {
            throw new BadRequestError('Classroom not found');
        }

        return classroom;
    }

    async getClassroomsByTeacherId({ user_id }) {
        const classrooms = await classroomModel.find({ user_id })
            .populate('user_id')
            .populate({
                path: 'exercises',
                populate: { path: 'classroom_id' },
            })
            .populate('school')
            .populate('subject')
            .populate('students')
        return classrooms;
    }

    // Hàm thêm học sinh vào lớp học bằng file Excel
    static addStudentsFromExcel = async (classroomId, filePath) => {
        const students = ClassroomService.readStudentsFromExcel(filePath);

        const classroom = await classroomModel.findById(classroomId);
        if (!classroom) throw new BadRequestError('Classroom not found');

        for (const student of students) {
            let user = await userModel.findOne({ user_email: student.email });

            if (!user) {
                const signupData = {
                    fullname: student.fullname,
                    email: student.email,
                    password: '12345678',
                    type: 'student',
                    attributes: {}
                };

                const newUser = await AccessService.signup(signupData);
                user = newUser.user;
            }

            // Thêm học sinh vào lớp nếu chưa có
            if (!classroom.students.includes(user._id)) {
                classroom.students.push(user._id);

                await studentModel.updateOne(
                    { _id: user._id },
                    { $addToSet: { classroom_ids: classroomId } },
                    { upsert: true }
                );
            }
        }

        await classroom.save();
        return classroom;
    }

    // Hàm thêm một học sinh
    async addStudent({ classroomId, user_email }) {
        const classroom = await classroomModel.findById(classroomId);
        if (!classroom) throw new BadRequestError('Classroom not found');

        let user = await userModel.findOne({ user_email: user_email });

        if (!user) {
            const fullname = user_email.split('@')[0]
            const signupData = {
                fullname: fullname,
                email: user_email,
                password: '12345678',
                type: 'student',
                attributes: {}
            };

            const newUser = await AccessService.signup(signupData);
            user = newUser.user;
        }

        // Thêm học sinh vào lớp nếu chưa có
        if (!classroom.students.includes(user._id)) {
            classroom.students.push(user._id);

            await studentModel.updateOne(
                { _id: user._id },
                { $addToSet: { classroom_ids: classroomId } },
                { upsert: true }
            );
        }

        await classroom.save();
        return classroom;
    }

    // Xóa học sinh ra khỏi lớp
    async removeStudentFromClass(classroomId, studentId) {
        const classroom = await classroomModel.findByIdAndUpdate(
            classroomId,
            { $pull: { students: studentId } },
            { new: true }
        );
        if (!classroom) throw new BadRequestError('Classroom not found');

        await studentModel.findByIdAndUpdate(
            studentId,
            { $pull: { classroom_ids: classroomId } }
        );

        return classroom;
    }

    // Hàm đọc từ file Excel
    static readStudentsFromExcel = (filePath) => {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const studentsData = xlsx.utils.sheet_to_json(worksheet);

        const students = studentsData.map(row => ({
            fullname: row['full_name'],
            email: row['email']
        }));

        return students;
    };

    async uploadExcel(req, res) {

        if (!req.file) {
            throw new BadRequestError('No file uploaded');
        }

        const filePath = req.file.path;
        console.log("File được lưu ở: " + filePath);
        const classroom = ClassroomService.addStudentsFromExcel(req.body.classroomId, filePath);
        return classroom;
    }
}
module.exports = new ClassroomService();
