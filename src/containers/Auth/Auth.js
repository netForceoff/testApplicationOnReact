import React from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'
import is from 'is_js' // Блиблиотека на проверку регулярок

// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

export default class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: { // Создание инпутов 
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Минимальная длина символов равна 6',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        // debugger
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid // trim() - убирает пробелы
            // Если value не равно пустому вернет isValid - true
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
            // Если mail вернет номарльно, то и isValid = true
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
            // Если длина больше минимальной, то и вернет true, иначе false
            
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        console.log(controlName, event.target.value)

        const formControls = {...this.state.formControls} // Создаем переменную чтобы не было мутации в главном объекте
        // Сделали полную копию объекта
        const control = {...formControls[controlName]} // Делаем копию email или password
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control // Обновить после всех изменений

        let isFormValid = true

        Object.keys(formControls).forEach(name => { // Преобразуем в массив, пробегаемся по email или password
            isFormValid = formControls[name].valid && isFormValid
            // Если valid true и isFormValid - true, то вернет true
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {// Преобразуем в массив
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key = {controlName + index}
                    type = {control.type}
                    value = {control.value}
                    valid = {control.valid}
                    touched = {control.touched}
                    label = {control.label}
                    shouldValidate = {!!control.validation} // !!Приводит тип к boolean
                    errorMessage = {control.errorMessage}
                    onChange = {event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className = "Auth">
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit = {this.submitHandler} className = "AuthForm">
                       {this.renderInputs()}

                        <Button
                         type = "success"
                         onClick = {this.loginHandler}
                         disabled = {!this.state.isFormValid} // Если не валидна, то будет disabled = true
                         >Войти</Button>
                        <Button
                         type = "primary"
                         onClick = {this.registerHandler}
                         disabled = {!this.state.isFormValid}
                         >Регистрация</Button>
                        </form>
                </div>
                </div>
        )
    }
}