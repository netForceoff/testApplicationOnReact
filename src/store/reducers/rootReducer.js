import {combineReducers} from 'redux'
import quizReduce from './QuizReduce'
import quizListReduce from './QuizListReduce'
import createReducer from './create'

export default combineReducers({
     quizReduce, quizListReduce, createReducer
})