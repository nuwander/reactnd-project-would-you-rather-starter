
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER} from './actionTypes'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function addQuestionAnswer ({authedUser, qid, answer}) {
    return {
        type: ADD_ANSWER,
        authedUser,
        qid: qid,
        answer
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleAddQuestionAnswer (id, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())

        return saveQuestionAnswer({
            authedUser,
            qid: id,
            answer,
        })
        .then((info) => dispatch(addQuestionAnswer({
            authedUser,
            qid: id,
            answer,
        })))
        .then(() => dispatch(hideLoading()))
    }
}