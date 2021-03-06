// Компонент высокого порядка, который отвечает за разметку страницы

import React from 'react'
import './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'

class Layout extends React.Component {
    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {

        return (
            <div className = "Layout">
                <Drawer
                isOpen = {this.state.menu}
                onClose = {this.menuCloseHandler}
                isAuthentificated = {this.props.isAuthentificated}
                />
                <MenuToggle
                onToggle = {this.toggleMenuHandler}
                isOpen = {this.state.menu}
                />
                <main>
                    {this.props.children} 
                    {/* Оборачивает в себя другие модули */}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthentificated: !!state.authReducer.token
    }
}

export default connect(mapStateToProps, null)(Layout)