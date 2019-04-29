//Модуль, отвечающий за вывод существующих тестов на сайте

import React from 'react'
import './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false}
]

class Drawer extends React.Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key = {index}>
                <NavLink
                to = {link.to}
                exact = {link.exact}
                activeClassName = {"active"}
                onClick = {this.clickHandler}
                >
                    {link.label}
                    </NavLink> 
                </li>
            )
        });
    }

    clickHandler = () => {
        this.props.onClose()
    }


    render() {

        return (
            <>
            <nav className = {!this.props.isOpen ? 'Drawer close' : 'Drawer'} >
                <ul>
                {this.renderLinks()}  
                </ul>
            </nav>
             {this.props.isOpen ? <Backdrop onClick = {this.props.onClose} /> : null}
            </>
        )
    }
}

export default Drawer