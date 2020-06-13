import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import authService from '../services/authService'

import Navbar from '../components/navbar/navbar'
import Logout from '../components/common/logout'
import ProtectedRoute from '../components/common/protectedRoute'

import Home      from './home/home'
import Login     from './authentication/login'
import Register  from './authentication/register'
import About     from './about/about'
import Help      from './help/help'
import Dashboard from './dashboard/dashboard'
import Account   from './account/account'

import './App.css'

const App = () => {
    return (
        <div className='grid-container main-layout'>
            <BrowserRouter>
                <header>
                    <Navbar user={authService.getCurrentUser()} />
                </header>

                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/about' exact component={About} />
                <Route path='/help' component={Help} />

                <ProtectedRoute path='/dashboard' component={Dashboard} />
                <ProtectedRoute path='/account' component={Account} />
                <Route path='/logout' exact component={Logout} />

                <footer>
                    <div>
                        &copy; Copyright <a href='https://nezuco.com' target='_blank' rel='noopener noreferrer'>Nezuco</a>, 2020. All rights reserved.
                        </div>
                </footer>
            </BrowserRouter>
        </div>
    )
}

export default App
