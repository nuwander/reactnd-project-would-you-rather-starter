import { RECEIVE_USERS, ADD_QUESTION, ADD_ANSWER } from '../actions/actionTypes'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION :
            const { id, author } = action.question
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([id])
                }
            }
        case ADD_ANSWER:
            return {
              ...state, 
              [action.authedUser]: {
                ...state[action.authedUser],
                answers: {
                  ...state[action.authedUser].answers,
                  [action.qid]: action.answer,
                },
              },
            };
        default :
            return state
    }
}