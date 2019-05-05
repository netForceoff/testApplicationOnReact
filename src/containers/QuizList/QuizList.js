import React from 'react'
import './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/actions'

class QuizList extends React.Component {
    renderQuizes() {
        return this.props.quizes.map((quiz) => {
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

    componentDidMount() { // Отвечает за запуск кода, после прогрузки DOM дерева, получать сервер нужно имеено после
        //загрузки DOM, иначе полезут ошибки
        //В пути нужно прописать json формат, чтобы получить объект, дать понять что мы работаем с json
        this.props.fetchQuizes()   
    }

    render() {
        return (
                <div className = "QuizList">
                    <div>
                        <h1>Список тестов</h1>

                        {
                            this.props.loading || this.props.quizes.length === 0 // При подключении Redux могут возникать ошибки
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

function mapStateToProps(state) {
    return {
        quizes: state.quizes,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)