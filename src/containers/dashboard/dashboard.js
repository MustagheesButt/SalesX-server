import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import Items from './items'
import Brands from './brands'
import Branches from './branches'
import Employees from './employees'

import './dashboard.css'

class Dashboard extends React.Component {
    render() {
        return (
            <main className='depth-1 grid-container' id='dashboard'>
                <aside className='depth-2'>
                    <ul>
                        <li><NavLink to='/dashboard' exact>Dashboard</NavLink></li>
                        <li><NavLink to='/dashboard/brands'>Brands</NavLink>
                            <ul>
                                <li><NavLink to='/dashboard/brands/new-brand'>Create a New Brand</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink to='/dashboard/branches'>Branches</NavLink></li>
                        <li><NavLink to='/dashboard/items'>Items</NavLink>
                            <ul>
                                <li><NavLink to='/dashboard/items/new-item'>Add New Item</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink to='/dashboard/employees'>Employees</NavLink>
                            <ul>
                                <li><NavLink to='/dashboard/employees/new-employee'>Add New Employee</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                <div id='main'>
                    <Route path='/dashboard' component={Guide} exact />
                    <Route path='/dashboard/brands' component={Brands} />
                    <Route path='/dashboard/branches' component={Branches} />
                    <Route path='/dashboard/items' component={Items} />
                    <Route path='/dashboard/employees' component={Employees} />
                </div>
            </main>
        )
    }
}

const Guide = (props) => {
    return (
        <React.Fragment>
            <section className='card depth-2'>
                <h3>Latest Transactions</h3>
                <p>Lorem ipsum dalor consit...</p>
            </section>

            <section className='card depth-2'>
                <h3>Branches Low on Stock</h3>
                <p>Lorem ipsum dalor consit...</p>
            </section>
        </React.Fragment>
    )
}

export default Dashboard