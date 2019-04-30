// Модуль framework для создания формы добавления теста

export function createControl(config, validation) {
    return {
        ...config, // Передается label, errorMessage
        validation, // передается required
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validate(value, validation = null) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export function validateForm(formControls) {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) { // Если есть control (input вопрос) в formControls. В корне объекта
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}

