import React from 'react'
//import logo from '../logo.svg'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import Navbar from '../components/Navbar/Navbar'

import Home from './Home/Home'
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import About from './About/About'
import Dashboard from './Dashboard/Dashboard'

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
