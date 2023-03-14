import {
	RECEIVE_QUESTIONS,
	ADD_QUESTION,
	SAVE_VOTE,
} from "../actions/questions";

export default function questions(state = null, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return { ...state, ...action.questions };

		case ADD_QUESTION:
			return {
				...state,
				[action.question.id]: action.question, //receives formatted question from action and we shape the new questions object.
			};

		case SAVE_VOTE:
			const authedUser = action.authedUser;
			const qid = action.qid;
			const answer = action.answer;

			return {
				...state, // previous state copy
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer], // copy the whole of the option
						votes: [...state[qid][answer].votes, authedUser],
					},
				},
			};

		default:
			return state;
	}
}
