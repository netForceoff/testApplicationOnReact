import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_START,
        FETCH_QUIZES_SUCCESS,
        FETCH_QUIZES_ERROR,
        FETCH_QUIZ_SUCCESS,
        QUIZ_SET_STATE_ANSWER_STATE_AND_RESULTS,
        QUIZ_SET_STATE_IS_FINISHED,
        QUIZ_SET_STATE_ACTIVE_QUESTION_AND_ANSWER_STATE,
        RESET_SETTINGS_STATE
        } from './actionsTypes'

export function fetchQuizes() {
    return async dispatch => { // Из за асинхронности вызова
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quises.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                console.log(response.data[key])
                quizes.push({
                    id: key,
                    name: response.data[key][0].quizName
                })
            })
            dispatch(fetchQuizesSuccess(quizes)) // Замена setState, принимает фукцию для сохраннеия, принимает объект с вопросами
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        console.log('THIS ID = ' + quizId) // Проверить, совпвдвет ли id теста с id в переходе на страницу в поисковике
        try {
            const response = await axios.get(`/quises/${quizId}.json`) // Получает объект с тестом по id
            dispatch(fetchQuizSuccess(response.data))
        }catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function  fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function setStateResultsAndAnswerState(answerState, results) {
    return {
        type: QUIZ_SET_STATE_ANSWER_STATE_AND_RESULTS,
        answerState, results
    }
}

export function setStateIsFinished() {
    return {
        type: QUIZ_SET_STATE_IS_FINISHED
    }
}

export function setStateActiveQuestionAndAnswerState(number) {
    return {
        type: QUIZ_SET_STATE_ACTIVE_QUESTION_AND_ANSWER_STATE,
        number
    }
}

export function resetSettingsState() {
    return {
        type: RESET_SETTINGS_STATE
    }
}

export function onAnswerCLickHandlerQuiz(answerId) {
    return (dispatch, getState) => { // Асинхронный, можно без async, т.к. неот работы с сервером, getState, получает state
        const state = getState() // Если будут еще reduce, то указывать через getState().example
        console.log('Answer Id', answerId);
        if (state.answerState) { // Убирание дабл клика на правильный ответ
            const key = Object.keys(state.answerState)[0]; // Преобразование в массив, т.к в answerState - объект, получаем 1 й элемент
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion] // Получаем текущий объект с вопросами
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(setStateResultsAndAnswerState({[answerId]: 'success'}, results))

            const  timeout = window.setTimeout(() => {
                if ((state.activeQuestion + 1) === state.quiz.length) {
                    dispatch(setStateIsFinished())
                } else {
                    dispatch(setStateActiveQuestionAndAnswerState(state.activeQuestion + 1))
                }

            window.clearTimeout(timeout); // Чтобы не было утечки памяти, и чтобы выключить timeout, как только закончится эта функция  
            }, 1000)

           
        } else {
            results[question.id] = 'error'
            dispatch(setStateResultsAndAnswerState({[answerId]: 'error'}, results))
        }
    }
}

export function onRetryAnswerQuiz() {
    return dispatch => {
        const timeOut = window.setTimeout(() => {
            // this.setState({
            //     isFinished: false,
            //     activeQuestion: 0,
            //     answerState: null
            // })
            dispatch(resetSettingsState())

            window.clearTimeout(timeOut)
        }, 1000)

    }
}