const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectString = `mongodb+srv://gleminidev:AMpX6YOVs9o2jXKL@gleminidevdb.zhvjv.mongodb.net/?retryWrites=true&w=majority&appName=gleminiDevDB`;
// Kết nối tới MongoDB
mongoose.connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Đã kết nối tới MongoDB"))
  .catch(err => console.error("Không thể kết nối tới MongoDB", err));

// Định nghĩa Schema cho Answer
const answerSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  text: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 0 }
});

// Định nghĩa Schema cho Question
const questionSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  quiz_id: { type: mongoose.Types.ObjectId, ref: 'Quiz' },
  question_excerpt: String,
  question_description: String,
  question_audio: String,
  question_image: String,
  question_video: String,
  question_point: Number,
  question_time: Number,
  question_explanation: String,
  question_type: String,
  question_answer_ids: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
  correct_answer_ids: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 0 }
});

// Định nghĩa Schema cho Quiz
const quizSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  user_id: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId("67175468870de15b55ce24b2") },
  quiz_name: String,
  quiz_description: String,
  quiz_status: String,
  quiz_thumb: String,
  quiz_turn: Number,
  shared_user_ids: [{ type: mongoose.Types.ObjectId }],
  subject_ids: [{ type: mongoose.Types.ObjectId, default: [new mongoose.Types.ObjectId("670f76d3fbe58e51feb81853")] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 1 }
});

// Khởi tạo Model
const Answer = mongoose.model('Answer', answerSchema);
const Question = mongoose.model('Question', questionSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

// Hàm tạo một câu trả lời ngẫu nhiên
function createRandomAnswer() {
  return new Answer({
    text: `Câu trả lời ${Math.floor(Math.random() * 100)}`,
    image: ""
  });
}

// Hàm tạo một câu hỏi ngẫu nhiên
async function createRandomQuestion(quizId) {
  const answers = await Promise.all(Array.from({ length: 4 }, () => createRandomAnswer().save()));
  const answerIds = answers.map(answer => answer._id);

  return new Question({
    quiz_id: quizId,
    question_excerpt: "Câu hỏi về động vật " + Math.floor(Math.random() * 100),
    question_description: "",
    question_audio: "",
    question_image: "",
    question_video: "",
    question_point: 1,
    question_time: 30,
    question_explanation: "Giải thích câu hỏi",
    question_type: "single",
    question_answer_ids: answerIds,
    correct_answer_ids: [answerIds[0]]
  });
}

// Hàm tạo một quiz ngẫu nhiên
async function createRandomQuiz() {
  const quiz = new Quiz({
    quiz_name: "Animals Quiz " + Math.floor(Math.random() * 1000),
    quiz_description: "This is a quiz about animals",
    quiz_status: "active",
    quiz_thumb: "",
    quiz_turn: 0,
    shared_user_ids: [],
    subject_ids: [new mongoose.Types.ObjectId("670f76d3fbe58e51feb81853")]
  });
  
  await quiz.save();

  const questions = await Promise.all(Array.from({ length: 5 }, () => createRandomQuestion(quiz._id).then(q => q.save())));
  return quiz;
}

// Chèn 1000 quiz vào cơ sở dữ liệu
async function insertQuizzes() {
  for (let i = 0; i < 1000; i++) {
    await createRandomQuiz();
    console.log(`Quiz ${i + 1} đã được chèn`);
  }
}

insertQuizzes()
  .then(() => console.log("Hoàn thành chèn 1000 quiz"))
  .catch(err => console.error("Lỗi:", err))
  .finally(() => mongoose.connection.close());
