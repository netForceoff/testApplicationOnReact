import React from 'react'
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Заполните поле',
        id: number
    }, {required: true})
}

function createFormControls() { // Для обнуления formControls после создания теста
    return {// Возвращаются изначально базовые значения
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Поле не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

function createNameControls() {
    return {
        testName: createControl({
            label: 'Введите название теста',
            errorMessage: 'Поле не может быть пустым'
        }, {required: true})
    }
}

class QuizCreator extends React.Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(), // Создали изначальный объект с вопросами
        testName: createNameControls(),
        isName: false
    }


    submitHandler = event => {
        event.preventDefault();
        
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls
        const testName = this.state.testName

        const questionItem = {
            question: question.value,
            quizName: testName.testName.value, // Добавили имя тесту
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    }

    createQuizHandler = event => {
        event.preventDefault()
        // async - делает запрос ассинхронным
            //await распрасит данный promise и положит его в переменную, что получилось
            this.setState({ // Обнуляем страницу после создания теста, чтобы повторные данные не отправились на серв
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls(),
                testName: createNameControls(),
                isName: false
            })

            this.props.finishCreateQuiz()
            console.log(this.props.quiz)
        }
       
            // .then(response => {
            //     console.log(response)
            // })
            // .catch(error => console.log(error))


    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls} 
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    changeName = value => {
        const testName = {...this.state.testName}
        testName.testName.touched = true
        testName.testName.value = value
        testName.testName.valid = validate(testName.testName.value, testName.testName.validation)

        this.setState({
            testName,
            isFormValid: validateForm(testName)
        })
    }

    selectChangeHandler = event => {
        console.log(event.target.value)
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    addNameHandler = () => {
        this.setState({
            isName: true
        })
    }

    renderControls() {
        if (!this.state.isName) {
            const name = this.state.testName
          return  <React.Fragment>
            <Input
                label = {name.testName.label}
                value = {name.testName.value}
                valid = {name.testName.valid}
                shouldValidate = {!!name.testName.validation}
                touched = {name.testName.touched}
                errorMessage = {name.testName.errorMessage}
                onChange = {event => this.changeName(event.target.value)}
            />
            <Button
            type = "primary"
            disabled = {!this.state.isFormValid}
            onClick = {this.addNameHandler}
            >
                Добавить имя
            </Button>
            </React.Fragment>
        } else {
            return Object.keys(this.state.formControls).map((controlName, index) => {
                const control = this.state.formControls[controlName] // Создали переменную, также как в авторизации с определенным вопросом

                return (
                    <React.Fragment key = {controlName + index}>
                        <Input
                            key = {controlName + index}
                            label = {control.label}
                            value = {control.value}
                            valid = {control.valid}
                            shouldValidate = {!!control.validation}
                            touched = {control.touched}
                            errorMessage = {control.errorMessage}
                            onChange = {event => this.changeHandler(event.target.value, controlName)}
                        />
                        {index === 0 ? <hr /> : null}
                    </React.Fragment>
                )
            })
        }
    }

    render() {
        const select = <Select
            label = "Выберите правильный ответ"
            value = {this.state.rightAnswerId}
            onChange = {this.selectChangeHandler}
            options = {[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />

        return (
            <div className = "QuizCreator">
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit = {this.submitHandler}>
                        
                        {this.renderControls()}


                        {this.state.isName ? select :null}

                        {
                            this.state.isName ?
                            <>
                            <Button 
                                type = "primary"
                                disabled = {!this.state.isFormValid}
                                onClick = {this.addQuestionHandler}
                                >Добавить вопрос</Button>
                            <Button 
                                type = "success"
                                disabled = {this.props.quiz.length === 0}
                                onClick = {this.createQuizHandler}
                                >Создать тест</Button>
                                </>
                            : null
                        }
                        
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.createReducer.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)