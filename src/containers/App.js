import React from 'react'
//import logo from '../logo.svg'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import Navbar from '../components/navbar/navbar'

import Home from './home/home'
import Login from './authentication/login'
import Register from './authentication/register'
import About from './about/about'
import Dashboard from './dashboard/dashboard'

function App() {
    return (
        <div className='grid-container'>
            <BrowserRouter>
                <header>
                    <Navbar user={0} />
                </header>

                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/about' exact component={About} />

                <Route path='/dashboard' component={Dashboard} />

                <footer>
                    <div>
                        &copy; Copyright, 2020. All rights reserved.
                    </div>
                </footer>
            </BrowserRouter>
        </div>
    )
}

export default App
