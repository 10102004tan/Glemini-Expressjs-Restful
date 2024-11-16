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
const { pushNotiForSys } = require('./notification.service');
const expoTokenModel = require('../models/expoToken.model');
const { pushNoti } = require('./expo.service');

class ClassroomService {

    // Hàm lấy lớp theo học sinh
    async getClassroomsByStudentId({ user_id }) {

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

        // push notification for student
        for (const studentId of classroom.students) {
            const noti = await pushNotiForSys({
                type: 'CLASSROOM-002',
                receiverId: studentId,
                senderId: classroom.user_id,
                content: `A new quiz has been added to the classroom ${classroom.class_name}`,
                options: {
                    classroom_id: classroom._id,
                    classroom_name: classroom.class_name,
                    quiz_id: quizId,
                    exercise_name: name,
                    exercise_id: newExercise._id
                }
            });
            // push real-time notification for user
            const listUserOnline = _listUserOnline.filter((item) => item.userId === studentId.toString());
            if (listUserOnline.length == 0) return;
            listUserOnline.forEach((item) => {
                item.socket.emit('notification', noti);
            });


        }
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

    // Hàm tạo xóa lớp
    async deleteClassroom(classroomId) {
        const classroom = await classroomModel.findById(classroomId);
        if (!classroom) throw new BadRequestError('Classroom not found');

        await studentModel.updateMany(
            { classroom_ids: classroomId },
            { $pull: { classroom_ids: classroomId } }
        );

        const deletedClassroom = await classroomModel.findByIdAndDelete(classroomId);

        return deletedClassroom ? true : false;
    }


    // Hàm lấy thông tin lớp học
    async getClassroomById(classroomId) {
        const classroom = await classroomModel.findById(classroomId)
            .populate({
                path: 'exercises',
                populate: {
                    path: 'quiz_id',
                    select: 'quiz_name quiz_thumb'
                }
            })
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

        // Initialize an array to hold promises for all user creation and classroom updates
        const studentPromises = students.map(async (student) => {
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

            // Add student to classroom if not already there
            if (!classroom.students.includes(user._id)) {
                await classroomModel.updateOne(
                    { _id: classroomId },
                    { $addToSet: { students: user._id } }
                );

                // Update student's classroom list
                await studentModel.updateOne(
                    { _id: user._id },
                    { $addToSet: { classroom_ids: classroomId } },
                    { upsert: true }
                );

                const noti = await pushNotiForSys({
                    type: 'CLASSROOM-001',
                    receiverId: user._id,
                    senderId: classroom.user_id,
                    content: `You have been added to the classroom ${classroom.class_name}`,
                    options: {
                        classroom_id: classroom._id,
                        classroom_name: classroom.class_name,
                    }
                });

                // push real-time notification for user
                const listUserOnline = _listUserOnline.filter((item) => item.userId === user._id.toString());
                if (listUserOnline.length == 0) {
                    // push notification with expo notification
                } else {
                    listUserOnline.forEach((item) => {
                        item.socket.emit('notification', noti);
                    });

                };

            }
        });

        // Wait for all promises to resolve before returning
        await Promise.all(studentPromises);

        return classroom;
    }


    // Hàm thêm một học sinh
    async addStudent({ classroomId, user_email }) {
        const classroom = await classroomModel.findById(classroomId);
        if (!classroom) throw new BadRequestError('Classroom not found');

        let user = await userModel.findOne({ user_email: user_email });

        // If the student is already in the classroom, throw an error
        if (user && classroom.students.includes(user._id)) {
            throw new BadRequestError('Student is already in this classroom');
        }

        if (!user) {
            const fullname = user_email.split('@')[0];
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
            await classroomModel.updateOne(
                { _id: classroomId },
                { $addToSet: { students: user._id } }
            );
            await studentModel.updateOne(
                { _id: user._id },
                { $addToSet: { classroom_ids: classroomId } },
                { upsert: true }
            );

            const noti = await pushNotiForSys({
                type: 'CLASSROOM-001',
                receiverId: user._id,
                senderId: classroom.user_id,
                content: `You have been added to the classroom ${classroom.class_name}`,
                options: {
                    classroom_id: classroom._id,
                    classroom_name: classroom.class_name,
                }
            });

            const listUserOnline = _listUserOnline.filter((item) => item.userId === user._id.toString());
            console.log("list:::", listUserOnline);
            if (listUserOnline.length == 0) {
                // push notification with expo notification
                const expoToken = await expoTokenModel.findOne({ user_id: user._id });
                const { tokens } = expoToken;
                if (tokens.length > 0) {
                    const listTokens = tokens.filter((item) => item && item.includes('ExponentPushToken'));
                    // push notification with expo notification
                    pushNoti({
                        somePushTokens: listTokens,
                        data: {
                            body: `Bạn đã được thêm vào lớp học ${classroom.class_name}`,
                            title: 'Thông báo',
                            data: noti.options
                        }
                    });
                }
            } else {
                listUserOnline.forEach((item) => {
                    item.socket.emit('notification', noti);
                });
            };
        }

        await classroom.save()
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
