import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import logo from '../../assets/images/logo42.png'
import './navbar.css'

const authUrl = process.env.REACT_APP_AUTH_URL

const Navbar = ({ user, location }) => {
    if (!user)
        return (
            <nav className='d-flex'>
                <div className='logo d-flex'>
                    <a href='/'><img src={logo} alt='SalesX Logo' /></a>
                </div>
                <NavLink to='/' exact>Home</NavLink>
                <a href={`${authUrl}?next=//${window.location.host}${location.pathname}`}>Login/Register</a>
                <NavLink to='/about'>About</NavLink>
            </nav>
        )
    else
        return (
            <nav className='d-flex' style={{ justifyContent: 'space-between' }}>
                <div className='logo d-flex'>
                    <a href='/'><img src={logo} alt='SalesX Logo' /></a>
                </div>

                <div className='d-flex flex-end'>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                    <NavLink to='/account'>{user.firstName} {user.lastName}</NavLink>
                    <NavLink to='/logout'>Logout</NavLink>
                    <NavLink to='/help'>Help</NavLink>
                </div>
            </nav>
        )
}

export default withRouter(Navbar)