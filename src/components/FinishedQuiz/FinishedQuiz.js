//Модуль за вывод результатов тестирования

import React from 'react'
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom' // Тоже обрачивает в ссылки, но с меньшим функционалом

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => { // Методом reduce перебирает элементы и с классами access и error, если нет error в вопросе с ответами, то складывает
        console.log(props.results[key])
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)
    return (
        <div className = "FinishedQuiz">
            <ul>
                {
                    props.quizArray.map((item, index) => {
                        return <li key = {index}>
                            <strong>{index + 1}. </strong>
                            {item.question}
                            <i className = {props.results[item.id] === 'error' ? 'fa fa-times error' : 'fa fa-check success'} />
                         </li>
                    })
                }      
            </ul>
            <p>Правильно {successCount} из {props.quizArray.length}</p>
            <div>
                <Button onClick = {props.onRetry} type = {'backgroundStyle'}>Повторить</Button>
                <Link to = {'/'}>
                <Button type = {'success'}>Выбрать другой тест</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz