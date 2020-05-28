import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom'

const Help = (props) => {
    return (
        <main className='depth-1 grid-container' id='help'>
            <aside className='depth-2'>
                <ul>
                    <li><NavLink to='/help' exact>Guide</NavLink></li>
                    <li><NavLink to='/help/faq'>FAQ</NavLink></li>
                    <li><NavLink to='/help/customer-support'>Contact Support</NavLink></li>
                </ul>
            </aside>

            <div id='main'>
                <Route path='/help' exact component={Guide} />
                <Route path='/help/faq' component={FAQ} />
                <Route path='/help/customer-support' component={CustomerSupport} />
            </div>
        </main>
    )
}

const Guide = (props) => {
    return (
        <section className='card depth-2'>
            <h1>Guide</h1>
            <h3>Table of Contents</h3>
            <ol>
                <li><a href='#getting-started'>Getting Started</a></li>
                <li><a href='#adding-items'>Adding New Items/Products</a></li>
                <li><a href='#creating-branches'>Creating New Branches</a></li>
                <li><a href='#adding-employees'>Adding New Employees</a></li>
            </ol>

            <h3 id='getting-started'>Getting Started</h3>
            <p>To begin, you need to <Link to='dashboard/brands/new-brand'>create a brand</Link>. When you have at least 1 brand,
            you can add items/products that will actually sell in your shop(s), or branches as we call them here, associated with that brand.</p>

            <h3 id='adding-items'>Adding New Items/Products</h3>
            <p>Now, time to <Link to='dashboard/items/new-item'>add some items/products</Link>.</p>

            <h3 id='creating-branches'>Creating New Branches</h3>
            <p>Next, you would want to allow your sales representative to login to the SalesX client. For that you need to add your branches,
            so employees can be associated with which branch they work at.</p>

            <h3 id='adding-employees'>Adding New Employees</h3>
            <p>Now, you would like to <Link to='/dashboard/employees/new-employee'>add some employees</Link>. Once any one of your employees sign in to the SalesX client,
            the client will sync with the list of items you have entered.</p>
        </section>
    )
}

const FAQ = (props) => {
    return (
        <section className='card depth-2'>
            <h1>FAQ</h1>
        </section>
    )
}

const CustomerSupport = (props) => {
    return (
        <section className='card depth-2'>
            <h1>Customer Support</h1>
        </section>
    )
}

export default Help