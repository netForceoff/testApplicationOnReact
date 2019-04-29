// Модуль, который отвечает за вывод самого теста.

import React from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends React.Component {
    state = {
        results: {}, // Объект вывода результатов, крест или галка
        isFinished: false,
        activeQuestion: 0, // Переключатель между вопросами
        answerState: null, // { [id]: 'succes' 'error' } Принимает класс с цветом, чтобы показать ошибка или нет
        quiz: [ // Массив, в котором будут содержаться все вопросы теста
            {
                question: 'Какого цвета тетрадь?',
                rightAnswerId: 2, // Какой правильный ответ, сравнение с id текста
                id: 1,
                answers: [
                    {text: 'Зеленый', id: 1},
                    {text: 'Красный', id: 2},
                    {text: 'Черный', id: 3},
                    {text: 'Голубой', id: 4}
                ]
            },
            {
                question: 'Какой сегодня день?',
                rightAnswerId: 4, // Какой правильный ответ, сравнение с id текста
                id: 2,
                answers: [
                    {text: 'Унылый', id: 1},
                    {text: 'Веселый', id: 2},
                    {text: 'Озорной', id: 3},
                    {text: 'Нейтральный', id: 4}
                ]
            }
        ] 
         
    }

    onRetryAnswer = () => {
        const timeOut = window.setTimeout(() => {
            this.setState({
                isFinished: false,
                activeQuestion: 0,
                answerState: null
            })

            window.clearTimeout(timeOut)
        }, 1000)

        
    }

    onAnswerCLickHandler = answerId => {
        console.log('Answer Id', answerId);
        if (this.state.answerState) { // Убирание дабл клика на правильный ответ
            const key = Object.keys(this.state.answerState)[0]; // Преобразование в массив, т.к в answerState - объект, получаем 1 й элемент
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion] // Получаем текущий объект с вопросами
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const  timeout = window.setTimeout(() => {
                if ((this.state.activeQuestion + 1) === this.state.quiz.length) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

            window.clearTimeout(timeout); // Чтобы не было утечки памяти, и чтобы выключить timeout, как только закончится эта функция  
            }, 1000)

           
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    componentDidMount() {
        console.log('THIS ID = ' + this.props.match.params.id) // Проверить, совпвдвет ли id теста с id в переходе на страницу в поисковике
    }

    render() {
        return (
            <div className = "Quiz">
                <div className = "QuizWrapper">
                    <h1>Тест</h1>

                    {
                        this.state.isFinished   
                        ? <FinishedQuiz
                        quizArray = {this.state.quiz}
                        results = {this.state.results}
                        onRetry = {this.onRetryAnswer}   
                        />
                        : <ActiveQuiz
                            question = {this.state.quiz[this.state.activeQuestion].question}
                            answers = {this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick = {this.onAnswerCLickHandler}
                            quizLength = {this.state.quiz.length}
                            answerNumber = {this.state.activeQuestion + 1}
                            state = {this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz