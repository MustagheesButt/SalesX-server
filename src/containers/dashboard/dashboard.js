import React from 'react'
import { Route, NavLink, Link } from 'react-router-dom'

import Items from './items'
import Brands from './brands'
import Branches from './branches'
import Employees from './employees'

import './dashboard.css'

class Dashboard extends React.Component {
    render() {
        return (
            <main className='depth-1' id='dashboard'>
                <aside className='depth-2'>
                    <ul>
                        <li><NavLink to='/dashboard' exact>Dashboard</NavLink></li>
                        <li><NavLink to='/dashboard/brands'>Brands</NavLink>
                            <ul>
                                <li><NavLink to='/dashboard/brands/new-brand'>Create a New Brand</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink to='/dashboard/branches'>Branches</NavLink>
                            <ul>
                                <li><NavLink to='/dashboard/branches/new-branch'>Create a New Branch</NavLink></li>
                            </ul>
                        </li>
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
        <section className='card'>
            <h1>Guide</h1>
            <h2>Table of Contents</h2>
            <ol>
                <li><a href='#getting-started'>Getting Started</a></li>
                <li><a href='#adding-items'>Adding New Items/Products</a></li>
                <li><a href='#creating-branches'>Creating New Branches</a></li>
                <li><a href='#adding-employees'>Adding New Employees</a></li>
            </ol>

            <h2 id='getting-started'>Getting Started</h2>
            <p>To begin, you need to <Link to='dashboard/brands/new-brand'>create a brand</Link>. When you have at least 1 brand,
            you can add items/products that will actually sell in your shop(s), or branches as we call them here, associated with that brand.</p>

            <h2 id='adding-items'>Adding New Items/Products</h2>
            <p>Now, time to <Link to='dashboard/items/new-item'>add some items/products</Link>.</p>

            <h2 id='creating-branches'>Creating New Branches</h2>
            <p>Next, you would want to allow your sales representative to login to the SalesX client. For that you need to add your branches,
            so employees can be associated with where they work from.</p>

            <h2 id='adding-employees'>Adding New Employees</h2>
            <p>Now, you would like to <Link to='/dashboard/employees/new-employee'>add some employees</Link>. Once any one of your employees sign in to the SalesX client,
            the client will sync with the list of items you have entered.</p>
        </section>
    )
}

export default Dashboard