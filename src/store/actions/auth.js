import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionsTypes'
import axios from 'axios'
export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
                email, password,
                returnSecureToken: true
            }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDRZsEVw7qOAw-OPsR05baJL8X-OJDT36Q'    
        
        if (isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDRZsEVw7qOAw-OPsR05baJL8X-OJDT36Q'
        }
        const response = await axios.post(url, authData) // AIzaSyDRZsEVw7qOAw-OPsR05baJL8X-OJDT36Q - ключ, берется из проекта в firebase
        console.log(response.data)
        const data = response.data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        console.log(expirationDate)
        // Мы получаем текущее время + время жизни авторизации, если это время жизни кончится, то потом придется делать повторно авторизацию
        // Заносим в локальное хранилище зарегестрировавшего пользователя для сохранения его параметров, чтобы потом повторный ввод не делать
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) { // Функция после входа вернет через час форму для повторной регистрации
    return dispatch => {
       setTimeout(() => {
           dispatch(logout())
       }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }

    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}