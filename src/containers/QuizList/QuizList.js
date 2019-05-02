import React from 'react'
import './QuizList.css'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

export default class QuizList extends React.Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return (
                <li
                key = {quiz.id}
                >
                <NavLink to = {'/quiz/' + quiz.id}>
                  {quiz.name}
                </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() { // Отвечает за запуск кода, после прогрузки DOM дерева, получать сервер нужно имеено после
        //загрузки DOM, иначе полезут ошибки
        //В пути нужно прописать json формат, чтобы получить объект, дать понять что мы работаем с json
        try {
            const response = await axios.get('quises.json')

            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            this.setState({
                quizes,
                loading: false
            })
            console.log(this.state.quizes)
        } catch (e) {
            console.log(e)
        }
      
    }

    render() {
        return (
                <div className = "QuizList">
                    <div>
                        <h1>Список тестов</h1>

                        {
                            this.state.loading
                            ? <Loader />
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                        }
                    
                    </div>
                </div>
        )
    }
}