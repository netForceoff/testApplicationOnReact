import React from 'react'
import './input.css'

function isInvalid({valid, touched, shouldValidate}) { // Подходит по формату
    return !valid && shouldValidate && touched // Если не валидный, должны валидировать и уже мы его потрогали, заполняли
}

const Input = props => {
    const inputType = props.type || 'text'
    const cls = ['Input']
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push('invalid')
    }
    return (
        <div className = {cls.join(' ')}>
            <label htmlFor = {htmlFor}>{props.label}</label>
            <input
            type = {inputType}
            id = {htmlFor}
            value = {props.value}
            onChange = {props.onChange}
            />
            {
                isInvalid(props)
                ? <span>{props.errorMessage  || 'Введите верное значение'}</span>
                : null
            }

            
            </div>
    )
}

export default Input