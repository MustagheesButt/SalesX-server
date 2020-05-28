import React from 'react'
import { NavLink, Route } from 'react-router-dom'

const Account = props => {
    return (
        <main className='depth-1 grid-container' id='account'>
            <aside className='depth-2'>
                <ul>
                    <li><NavLink to='/account' exact>Account</NavLink></li>
                    <li><NavLink to='/account/profile'>Profile</NavLink></li>
                    <li><NavLink to='/account/payments'>Payment Settings</NavLink></li>
                </ul>
            </aside>
            <div id='main'>
                <Route path='/account' component={AccountHome} exact />
                <Route path='/account/profile' component={AccountHome} />
                <Route path='/account/payments' component={AccountHome} />
            </div>
        </main>
    )
}

const AccountHome = props => {
    return (
        <section className='card depth-2'>
            <h2>Coming Soon</h2>
        </section>
    )
}

export default Account