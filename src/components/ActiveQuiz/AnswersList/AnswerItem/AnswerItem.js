//Модуль, который отвечает за вывод каждого вопроса <li>

import React from 'react'
import './AnswerItem.css'

const AnswerItem = props => { // Получаем параметры для вопроса
    const cls = ['AnswerItem']
    if (props.state) { // Если есть класс с ошибкой или подтверждением
        cls.push(props.state)
    }

    return (
        <li className = {cls.join(' ')}
        onClick = {() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem