'use strict';

const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const schema = {
  description:
    'List of quiz questions with various types including single choice, multiple choice, fill-in-blank, and ordering',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      quizBanner: {
        type: SchemaType.STRING,
        description: 'Please provide an image URL for this quiz based on the quiz content title',
        nullable: true,
      },
      questionName: {
        type: SchemaType.STRING,
        description:
          'Content of the question. For fill-in-blank questions, use underscores (_) to mark blank spaces',
        nullable: false,
      },
      questionImage: {
        type: SchemaType.STRING,
        description: 'URL of an image related to the question (optional)',
        nullable: true,
      },
      questionLanguage: {
        type: SchemaType.STRING,
        description: 'Language of the question (e.g., "vi", "en")',
        nullable: true,
      },
      questionExplanation: {
        type: SchemaType.STRING,
        description: 'Detailed explanation of the question and why the correct answer is right',
        nullable: true,
      },
      questionType: {
        type: SchemaType.STRING,
        description:
          'Type of question: "single" (one correct choice), "multiple" (multiple correct choices), "fill" (fill-in-blank), or "order" (arrange in order)',
        nullable: false,
      },
      answers: {
        type: SchemaType.ARRAY,
        description:
          'List of answers. Structure varies by question type: single/multiple=4 options, fill=blank answers, order=items to arrange',
        items: {
          type: SchemaType.OBJECT,
          description: 'Answer option with different structures based on question type',
          properties: {
            answerName: {
              type: SchemaType.STRING,
              description: 'Text content of the answer/option',
              nullable: false,
            },
            isCorrect: {
              type: SchemaType.BOOLEAN,
              description: 'Whether this answer is correct (for single/multiple choice)',
              nullable: true,
            },
            position: {
              type: SchemaType.NUMBER,
              description: 'Position/order for fill-in-blank or ordering questions (1-based index)',
              nullable: true,
            },
          },
          required: ['answerName'],
        },
      },
    },
    required: ['questionName', 'questionType', 'answers'],
  },
};

const model = genAI.getGenerativeModel({
  model: GEMINI_MODEL,
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schema,
  },
});

module.exports = {
  model,
  GEMINI_API_KEY,
};
