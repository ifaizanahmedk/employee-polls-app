import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addAnswerUser, addQuestionUser } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_VOTE = "SAVE_VOTE";

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

export function saveVote(authedUser, qid, answer) {
	return {
		type: SAVE_VOTE,
		authedUser,
		qid,
		answer,
	};
}

export function handleAddQuestion(firstOption, secondOption) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		return saveQuestion({
			optionOneText: firstOption,
			optionTwoText: secondOption,
			author: authedUser,
		}).then((question) => {
			dispatch(addQuestion(question));
			dispatch(addQuestionUser(question));
		});
	};
}

export function handleVote(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
			dispatch(saveVote(authedUser, qid, answer));
			dispatch(addAnswerUser(authedUser, qid, answer));
		});
	};
}
