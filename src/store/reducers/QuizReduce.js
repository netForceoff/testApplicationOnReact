import {FETCH_QUIZES_START,
        FETCH_QUIZES_SUCCESS,
        FETCH_QUIZES_ERROR,
        FETCH_QUIZ_SUCCESS,
        QUIZ_SET_STATE_ANSWER_STATE_AND_RESULTS,
        QUIZ_SET_STATE_IS_FINISHED,
        QUIZ_SET_STATE_ACTIVE_QUESTION_AND_ANSWER_STATE,
        RESET_SETTINGS_STATE
        } from '../actions/actionsTypes'

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0, 
    answerState: null,
    quiz: null // null, а не [] - потому что мы загружаем с сервера, должны опроеделить его, 
}

export default function quizReduce(state = initialState, action) {
    switch(action.type) {
        case FETCH_QUIZES_START: // Когда пошла загрука тестов
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes // Указывали его в actions
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE_ANSWER_STATE_AND_RESULTS:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case QUIZ_SET_STATE_IS_FINISHED:
            return {
                ...state, isFinished: true
            }
        case QUIZ_SET_STATE_ACTIVE_QUESTION_AND_ANSWER_STATE:
            return {
                ...state, answerState: null, activeQuestion: action.number
            }
        case RESET_SETTINGS_STATE: 
            return {
                ...state, isFinished: false, activeQuestion: 0, answerState: null
            }
        default: 
            return state
    }
}