import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from './actionsTypes'

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

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}