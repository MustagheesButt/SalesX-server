import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Logout from '../components/common/logout'
import ProtectedRoute from '../components/common/protectedRoute'

import Home      from './home/home'
import Auth      from './authentication/auth'
import About     from './about/about'
import Help      from './help/help'
import Dashboard from './dashboard/dashboard'
import Account   from './account/account'

import './App.css'

const App = () => {
    return (
        <div className='grid-container main-layout'>
            <BrowserRouter>
                <Route path='/' exact component={Home} />
                <Route path='/auth' exact component={Auth} />
                <Route path='/about' exact component={About} />
                <Route path='/help' component={Help} />

                <ProtectedRoute path='/dashboard' component={Dashboard} />
                <ProtectedRoute path='/account' component={Account} />
                <Route path='/logout' exact component={Logout} />
            </BrowserRouter>
        </div>
    )
}

export default App
