'use strict';

const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const schema = {
	description: 'List of questions',
	type: SchemaType.ARRAY,
	items: {
		type: SchemaType.OBJECT,
		properties: {
			quizBanner: {
				type: SchemaType.STRING,
				description:
					'Please provide an image for this quiz based on the quiz content title',
				nullable: false,
			},
			questionName: {
				type: SchemaType.STRING,
				description: 'Content of the question',
				nullable: false,
			},
			questionImage: {
				type: SchemaType.STRING,
				description: 'Url Image of the question',
				nullable: true,
			},
			questionLanguage: {
				type: SchemaType.STRING,
				description: 'Language of the question',
				nullable: true,
			},
			questionExplanation: {
				type: SchemaType.STRING,
				description:
					'Detailed explanation of the question, reason why this answer is correct',
				nullable: true,
			},
			questionType: {
				type: SchemaType.STRING,
				description: 'Type of the question (single or multiple or box)',
				nullable: true,
			},
			answers: {
				type: SchemaType.ARRAY,
				description:
					'List of answers have 4 items if question type is single or multiple, if question type is box list of answer have only 1 items',
				items: {
					type: SchemaType.OBJECT,
					description: 'Answer of the question',
					properties: {
						answerName: {
							type: SchemaType.STRING,
							description: 'Name of the answer',
							nullable: false,
						},
						isCorrect: {
							type: SchemaType.BOOLEAN,
							description: 'Is this answer correct?',
							nullable: false,
						},
					},
				},
			},
		},
		required: [
			'questionName',
			'answers',
			'questionImage',
			'questionType',
			'questionExplanation',
			'quizBanner',
		],
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
