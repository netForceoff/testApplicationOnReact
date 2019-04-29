// Компонент, который отвечает за формарование списка вопросов, которе будут на главной странице, которые будут показываться (ActiveQuiz)

import React from 'react'
import './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => ( // Будем получать некоторый массив с вопросами и ответами, а нам нужно их вывести
    <ul className = "AnswersList">
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                key = {index}
                answer = {answer}
                onAnswerClick = {props.onAnswerClick}
                state={props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default AnswersList