import {combineReducers} from 'redux'
import quizReduce from './QuizReduce' 

export default combineReducers({
    quiz: quizReduce
})