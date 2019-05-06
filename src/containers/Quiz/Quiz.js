// Модуль, который отвечает за вывод самого теста.

import React from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {connect} from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import {fetchQuizById, onAnswerCLickHandlerQuiz, onRetryAnswerQuiz} from '../../store/actions/quiz'

class Quiz extends React.Component {


    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() { // Когда произойдет уход со страницы, тесты обнулятся и все по новой // componentWillUnmount - когда происходит уход со страницы
        this.props.onRetryAnswerQuiz()
    }

    render() {
        return (
            <div className = "Quiz">
                <div className = "QuizWrapper">
                    <h1>Тест</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished   
                        ? <FinishedQuiz
                        quizArray = {this.props.quiz}
                        results = {this.props.results}
                        onRetry = {this.props.onRetryAnswerQuiz}   
                        />
                        : <ActiveQuiz
                            question = {this.props.quiz[this.props.activeQuestion].question}
                            answers = {this.props.quiz[this.props.activeQuestion].answers}
                            onAnswerClick = {this.props.onAnswerCLickHandlerQuiz}
                            quizLength = {this.props.quiz.length}
                            answerNumber = {this.props.activeQuestion + 1}
                            state = {this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        results: state.quizReduce.results,
        isFinished: state.quizReduce.isFinished,
        activeQuestion: state.quizReduce.activeQuestion, 
        answerState: state.quizReduce.answerState,
        quiz: state.quizReduce.quiz,
        loading: state.quizReduce.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: numberId => dispatch(fetchQuizById(numberId)),
        onAnswerCLickHandlerQuiz: answerId => dispatch(onAnswerCLickHandlerQuiz(answerId)),
        onRetryAnswerQuiz: () => dispatch(onRetryAnswerQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)