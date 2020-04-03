import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.css'

const Navbar = (props) => {
    if (!props.user)
        return (
            <nav className='flex-container'>
                <NavLink to='/' exact>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Register</NavLink>
                <NavLink to='/about'>About</NavLink>
            </nav>
        )
    else
        return (
            <nav className='flex-container' style={{ justifyContent: 'space-between' }}>
                <div className='flex-container' style={{ color: '#ffffff' }}>
                    <a>SalesX</a>
                </div>

                <div className='flex-container flex-end'>
                    <NavLink to='/profile'>{props.user.firstName} {props.user.lastName}</NavLink>
                    <NavLink to='/logout'>Logout</NavLink>
                    <NavLink to='/help'>Help</NavLink>
                </div>
            </nav>
        )
}

export default Navbar