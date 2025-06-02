'use strict';
const { model } = require('../../configs/gemini.config');

const createJsonData = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

describe('Test Gemini API', () => {
  test('Total number of questions is 2', async () => {
    const prompt = 'List a 2 questions for subject Đất nước Việt Nam. Language is Vietnamese';
    const response = await createJsonData(prompt);
    const data = JSON.parse(response);
    expect(data.length).toBe(2);
  });

  test('Each question has 4 answers', async () => {
    const prompt = 'List a 2 questions for subject Đất nước Việt Nam. Language is Vietnamese';
    const response = await createJsonData(prompt);
    const data = JSON.parse(response);
    data.forEach((question) => {
      expect(question.answer.length).toBe(4);
    });
  });

  test('Each question has 1 correct answer when question type is single', async () => {
    const prompt = 'List a 2 questions for subject Math. Question type is single';
    const response = await createJsonData(prompt);
    const data = JSON.parse(response);
    data.forEach((question) => {
      const correctAnswer = question.answer.filter((answer) => answer.isCorrect);
      expect(correctAnswer.length).toBe(1);
    });
  });
});
