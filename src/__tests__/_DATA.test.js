const _DATA = require("../utils/_DATA");

describe("_saveQuestion", () => {
	it("will return the saved question when all option fields are filled", async () => {
		const question = {
			optionOneText: "Code in JavaScript",
			optionTwoText: "Code in Python",
			author: "mtsamis",
		};
		const resQuestion = await _DATA._saveQuestion(question);
		const questionData = {
			author: "mtsamis",
			optionOne: {
				votes: [],
				text: "Code in JavaScript",
			},
			optionTwo: {
				votes: [],
				text: "Code in Python",
			},
		};
		expect(resQuestion).toEqual(expect.objectContaining(questionData));
		expect(typeof resQuestion.id === "string").toBe(true);
		expect(typeof resQuestion.timestamp === "number").toBe(true);
	});

	it("will return an error message if incorrect data is passed", async () => {
		const _question = {
			optionOneText: undefined,
			optionTwoText: undefined,
			author: "mtsamis",
		};

		const error = "Please provide optionOneText, optionTwoText, and author";

		await expect(_DATA._saveQuestion(_question)).rejects.toEqual(error);
	});
});

describe("_saveQuestionAnswer", () => {
	it("will return the saved answer when the vote is submitted", async () => {
		const _answer = {
			authedUser: "mtsamis",
			qid: "loxhs1bqm25b708cmbf3g",
			answer: "optionOne",
		};

		await expect(_DATA._saveQuestionAnswer(_answer)).resolves.toBe(true);
	});

	it("will return an error message if incorrect data is passed into the function", async () => {
		const _answer = {
			authedUser: "mtsamis",
			qid: "",
			answer: "this is a general answer",
		};

		const error = "Please provide authedUser, qid, and answer";

		await expect(_DATA._saveQuestionAnswer(_answer)).rejects.toEqual(error);
	});
});
