import { ADD_QUESTION, SAVE_VOTE } from "../actions/questions";
import { RECEIVE_USERS } from "../actions/users";

export default function users(state = null, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};

		case ADD_QUESTION:
			const question = action.question;
			return {
				...state,
				[question.author]: {
					...state[question.author],
					questions: [
						...state[question.author].questions,
						question.id,
					],
				},
			};

		case SAVE_VOTE:
			const authedUser = action.authedUser;
			const qid = action.qid;
			const answer = action.answer;

			return {
				...state, // previous state copy
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers, // copy the whole of the option
						[qid]: answer,
					},
				},
			};

		default:
			return state;
	}
}
