const classroomModel = require('../models/classroom.model');
const studentModel = require('../models/student.model');
const quizModel = require('../models/quiz.model');
const schoolModel = require('../models/school.model');
const subjectModel = require('../models/subject.model');
const exerciseModel = require('../models/exercise.model');
const AccessService = require('../../v2/services/access.service');
const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');
const { BadRequestError } = require('../cores/error.repsone');
const fs = require('fs');
const xlsx = require('xlsx');
const { pushNotiForSys } = require('./notification.service');
const expoTokenModel = require('../models/expoToken.model');
const { pushNoti } = require('./expo.service');
const { findExpoTokenByListUserId } = require('./expoToken.service');
const { log } = require('console');


class ClassroomService {
  // Hàm lấy lớp theo học sinh
  async getClassroomsByStudentId({ user_id }) {
    const classrooms = await studentModel.findById(user_id).populate({
      path: 'classroom_ids',
      populate: [
        {
          path: 'user_id',
          select: 'user_fullname user_email user_avatar',
        },
        {
          path: 'exercises',
          select: 'quiz_id',
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

    return classrooms?.classroom_ids ? classrooms.classroom_ids : [];
  }

  // Hàm thông báo cho sinh viên khi giáo viên tạo một phòng chơi mới
  async notifyStudentWhenTeacherCreateRoom({ classroomId, roomCode }) {
    const classroom = await classroomModel
      .findById(classroomId)
      .populate('students')
      .populate('user_id')
      .populate('exercises');

    if (!classroom) {
      throw new BadRequestError('Classroom not found');
    }

    for (const student of classroom.students) {
      const noti = await pushNotiForSys({
        type: 'ROOM-001',
        receiverId: student._id,
        senderId: classroom.user_id,
        content: `Giáo viên của bạn vừa mở một phòng kiểm tra mới trong lớp ${classroom.class_name}`,
        options: {
          classroom_id: classroom._id,
          classroom_name: classroom.class_name,
          room_code: roomCode,
          avatar: classroom.user_id.user_avatar,
          name: classroom.user_id.user_fullname,
        },
      });

      // push real-time notification for user
      const listUserOnline = _listUserOnline.filter(
        (item) => item.userId === student._id.toString(),
      );

      if (listUserOnline.length === 0) {
        // push notification with expo notification
        const listExpoTokens = await findExpoTokenByListUserId(classroom.students);

        if (listExpoTokens.length > 0) {
          pushNoti({
            somePushTokens: listExpoTokens,
            data: {
              body: `Giáo viên của bạn vừa mở một phòng kiểm tra mới trong lớp ${classroom.class_name}`,
              title: 'Thông báo',
              data: noti.options,
            },
          });
        }
      } else {
        listUserOnline.forEach((item) => {
          item.socket.emit('notification', noti);
        });
      }
    }
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
      date_end: deadline,
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
          exercise_id: newExercise._id,
        },
      });
      // send notification to user online
      const userSocket = _listUserOnline.find((item) => item.userId === studentId.toString());
      if (userSocket) {
        userSocket.socket.emit('notification', noti);
      }
    }

    // push notification

    const listExpoTokens = await findExpoTokenByListUserId(classroom.students);
    await pushNoti({
      somePushTokens: listExpoTokens,
      data: {
        body: `Bài tập mới đã được thêm vào lớp ${classroom.class_name}`,
        title: 'Thông báo',
        data: {
          body: `Bài tập mới đã được thêm vào lớp ${classroom.class_name}`,
          title: 'Thông báo',
          data: {
            classroom_id: classroom._id,
            classroom_name: classroom.class_name,
            quiz_id: quizId,
            exercise_name: name,
            exercise_id: newExercise._id,
          },
        },
      },
    });
    return classroom;
  }

  // Hàm tạo lớp học mới
  async createClassroom(classData) {
    const school = await schoolModel.findById(classData.school_id);
    if (!school) throw new BadRequestError('School not found');

    const subject = await subjectModel.findById(classData.subject_id);

    if (!subject) throw new BadRequestError('Subject not found');

    const teacher = await userModel.findById(classData.user_id);

    const classroom = await classroomModel.create({
      class_name: classData.class_name,
      exercises: [],
      school: school._id,
      subject: subject._id,
      user_id: teacher._id,
      students: classData.students || [],
    });

    return classroom;
  }

  // Hàm tạo xóa lớp
  async deleteClassroom(classroomId) {
    const classroom = await classroomModel.findById(classroomId);
    if (!classroom) throw new BadRequestError('Classroom not found');

    await studentModel.updateMany(
      { classroom_ids: classroomId },
      { $pull: { classroom_ids: classroomId } },
    );

    const deletedClassroom = await classroomModel.findByIdAndDelete(classroomId);

    return deletedClassroom ? true : false;
  }

  // Hàm lấy thông tin lớp học
  async getClassroomById(classroomId) {
    const classroom = await classroomModel
      .findById(classroomId)
      .populate({
        path: 'exercises',
        populate: {
          path: 'quiz_id',
          select: 'quiz_name quiz_thumb',
        },
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
    const classrooms = await classroomModel
      .find({ user_id })
      .populate('user_id')
      .populate({
        path: 'exercises',
        populate: { path: 'classroom_id' },
      })
      .populate('school')
      .populate('subject')
      .populate('students');
    return classrooms;
  }

  // Hàm thêm học sinh vào lớp học bằng file Excel
  static addStudentsFromExcel = async (classroomId, filePath) => {
  const students = ClassroomService.readStudentsFromExcel(filePath);
  if (!students || students.length === 0) {
    throw new BadRequestError('Không có dữ liệu học sinh từ file Excel');
  }

  // Lọc trùng email, chỉ lấy duy nhất mỗi email
  const uniqueEmails = [...new Set(students.map(s => s.email.trim().toLowerCase()))];

  const results = await Promise.all(
    uniqueEmails.map(async (email) => {
      try {
        const success = await ClassroomService.addStudent({ classroomId, user_email: email });
        return { email, success };
      } catch (err) {
        console.error(`❌ Thêm học sinh thất bại cho email: ${email}`, err);
        return { email, success: false };
      }
    })
  );

  const successList = results.filter(r => r.success).map(r => r.email);
  const failedList = results.filter(r => !r.success).map(r => r.email);

  return {
    success: successList.length,
    failed: failedList.length,
    failedList,
  };
};


  // Hàm thêm một học sinh
  static addStudent = async( {classroomId, user_email} ) => {
    try {
      const classroom = await classroomModel.findById(classroomId);
      if (!classroom) throw new BadRequestError('Classroom not found');

      let user = await userModel.findOne({ user_email });

      // console.log('user::', user);

      //  Nếu người dùng tồn tại thì kiểm tra vai trò từ bảng roles
      if (user) {
        const role = await roleModel.findOne(user.user_role).lean();
        // console.log('role::', role);

        if (role && role.role_name === 'teacher') {
          console.warn(`User with email ${user_email} is a teacher and cannot be added to the classroom.`);
          return false;
        }

        // Nếu học sinh đã ở trong lớp, trả về false
        if (classroom.students.includes(user._id)) {
          return false;
        }
      }

      // Nếu người dùng chưa tồn tại thì tạo mới
      if (!user) {
        const fullname = user_email.split('@')[0];
        const signupData = {
          email: user_email,
          password: '12345678',
          fullname: fullname,
        };

        const newUser = await AccessService.signup(signupData);
        user = newUser.user;

        // Sau khi tạo, kiểm tra lại role
        const role = await roleModel.findOne(user.user_role).lean();
        if (role && role.role_name === 'teacher') {
          console.warn(`User with email ${user_email} is a teacher and cannot be added to the classroom.`);
          return false;
        }
      }

      // hêm học sinh vào lớp nếu chưa có
      if (!classroom.students.includes(user._id)) {
        await classroomModel.updateOne({ _id: classroomId }, { $addToSet: { students: user._id } });
        await studentModel.updateOne(
          { _id: user._id },
          { $addToSet: { classroom_ids: classroomId } },
          { upsert: true },
        );

        const noti = await pushNotiForSys({
          type: 'CLASSROOM-001',
          receiverId: user._id,
          senderId: classroom.user_id,
          content: `You have been added to the classroom ${classroom.class_name}`,
          options: {
            classroom_id: classroom._id,
            classroom_name: classroom.class_name,
          },
        });

        const listUserOnline = _listUserOnline.filter(item => item.userId === user._id.toString());
        if (listUserOnline.length === 0) {
          const expoToken = await expoTokenModel.findOne({ user_id: user._id }, { token: 1 }).lean();
          if (expoToken) {
            pushNoti({
              somePushTokens: [expoToken],
              data: {
                body: `Bạn đã được thêm vào lớp học ${classroom.class_name}`,
                title: 'Thông báo',
                data: noti.options,
              },
            });
          }
        } else {
          listUserOnline.forEach(item => item.socket.emit('notification', noti));
        }
      }

      await classroom.save();
      return true;
    } catch (error) {
      console.error('Error in addStudent:', error);
      return false;
    }
  }

  async addStudentToClass({classroomId, user_email}) {
    return await ClassroomService.addStudent({classroomId, user_email});
  }

  // Xóa học sinh ra khỏi lớp
  async removeStudentFromClass(classroomId, studentId) {
    const classroom = await classroomModel.findByIdAndUpdate(
      classroomId,
      { $pull: { students: studentId } },
      { new: true },
    );
    if (!classroom) throw new BadRequestError('Classroom not found');

    await studentModel.findByIdAndUpdate(studentId, {
      $pull: { classroom_ids: classroomId },
    });

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

    const students = studentsData.map((row) => ({
      fullname: row['full_name'],
      email: row['email'],
    }));

    return students;
  };

  async uploadExcel(req, res) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    const filePath = req.file.path;
    console.log('File được lưu ở: ' + filePath);
    const classroom = ClassroomService.addStudentsFromExcel(req.body.classroomId, filePath);
    return classroom;
  }
}
module.exports = new ClassroomService();
