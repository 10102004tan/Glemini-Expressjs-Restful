const QuizService = require("@v2/services/quiz.service");
const quizModel = require('@v1/models/quiz.model');
const { ObjectId } = require('mongodb');

// Mock quizModel
jest.mock('@v1/models/quiz.model', () => ({
  aggregate: jest.fn(),
  countDocuments: jest.fn(),
}));

describe('QuizService.search', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return quizzes with question count > 0 and pagination info', async () => {
    const fakeQuizzes = [
      {
        _id: 'quiz1',
        quiz_name: 'Quiz 1',
        question_count: 5,
        user_fullname: 'User A',
      },
    ];

    quizModel.aggregate.mockResolvedValue(fakeQuizzes);
    quizModel.countDocuments.mockResolvedValue(1);

    const result = await QuizService.search({
      key: 'Quiz',
      page: 1,
      limit: 10,
      sortStatus: -1,
      quiz_on: 2,
      subjectIds: ['60f5a3b1b2e8d2a4d44b7f12'],
    });

    expect(quizModel.aggregate).toHaveBeenCalled();
    expect(quizModel.countDocuments).toHaveBeenCalledWith(expect.objectContaining({
      quiz_name: { $regex: 'Quiz', $options: 'i' },
      quiz_status: 'published',
      quiz_turn: { $gte: 2 },
      subject_ids: {
        $in: [ObjectId.createFromHexString('60f5a3b1b2e8d2a4d44b7f12')],
      },
    }));
    expect(result.items.length).toBe(1);
    expect(result.totalPage).toBe(1);
    expect(result.totalItems).toBe(1);
  });

  it('should return empty results when no quizzes found', async () => {
    quizModel.aggregate.mockResolvedValue([]);
    quizModel.countDocuments.mockResolvedValue(0);

    const result = await QuizService.search({
      key: '',
      page: 1,
      limit: 5,
      quiz_on: -1,
      subjectIds: [],
    });

    expect(result.items).toEqual([]);
    expect(result.totalItems).toBe(0);
    expect(result.totalPage).toBe(0);
  });
});

