import React, { useEffect } from 'react'
import { NavLink, Route } from 'react-router-dom'

const Account = () => {
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

const AccountHome = () => {
    useEffect(() => {
        document.title = `Account | ${process.env.REACT_APP_NAME}`
    })

    return (
        <section className='card depth-2'>
            <h2>Coming Soon</h2>
        </section>
    )
}

export default Account