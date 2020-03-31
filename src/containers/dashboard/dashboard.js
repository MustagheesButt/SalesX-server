import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import Items from './items'
import Brands from './brands'
import Branches from './branches'

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
                        <li><NavLink to='/dashboard/inventory'>Inventory</NavLink></li>
                        <li><NavLink to='/dashboard/employees'>Employees</NavLink></li>
                    </ul>
                </aside>
                <div id='main'>
                    <Route path='/dashboard' component={Guide} exact />
                    <Route path='/dashboard/brands' component={Brands} />
                    <Route path='/dashboard/branches' component={Branches} />
                    <Route path='/dashboard/items' component={Items} />
                </div>
            </main>
        )
    }
}

const Guide = (props) => {
    return (
        <section className='card'>
            <h2>Guide</h2>
            <p>To begin, you need to create a shop. Then you would like to add some employees. And then some items (that your shops will sell).</p>
            <p>Once any one of your employees sign in to the SalesX client, the client will sync with the list of items you have entered.</p>
        </section>
    )
}

export default Dashboard