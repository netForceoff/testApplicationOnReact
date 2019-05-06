//Модуль, отвечающий за вывод существующих тестов на сайте

import React from 'react'
import './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends React.Component {
    renderLinks(links) {
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

        let links = [
            {to: '/', label: 'Список', exact: true},
            {to: '/auth', label: 'Авторизация', exact: false}
        ]

        if (this.props.isAuthentificated) {
            links = [
                {to: '/', label: 'Список', exact: true},
                {to: '/quiz-creator', label: 'Создать тест', exact: false},
                {to: '/logout', label: 'Выйти', exact: false}
            ]
        }

        return (
            <>
            <nav className = {!this.props.isOpen ? 'Drawer close' : 'Drawer'} >
                <ul>
                {this.renderLinks(links)}  
                </ul>
            </nav>
             {this.props.isOpen ? <Backdrop onClick = {this.props.onClose} /> : null}
            </>
        )
    }
}

export default Drawer