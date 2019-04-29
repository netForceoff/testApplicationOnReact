import React from 'react'
import './MenuToggle.css'


const MenuToggle = props => {
    return (
        <i
        className = {props.isOpen ? 'MenuToggle fa fa-times open' : 'MenuToggle fa fa-bars'}
        onClick = {props.onToggle}
        />
    )
}

export default MenuToggle