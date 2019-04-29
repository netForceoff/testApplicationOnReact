// Компонент, который отвечает за вывод активного теста с вопросами
import React from 'react'
import './ActiveQuiz.css'
import AnsersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
    <div className = "ActiveQuiz">
        <p className = "Question">
            <span>
                <strong>{props.answerNumber}. &nbsp;</strong>
                {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>

       <AnsersList
       state = {props.state}
       answers = {props.answers}
       onAnswerClick = {props.onAnswerClick}
       />
    </div>
)

export default ActiveQuiz
