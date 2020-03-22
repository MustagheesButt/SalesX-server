import React from 'react'
import { Route, Link } from 'react-router-dom'

import './Dashboard.css'

class Dashboard extends React.Component {
    render() {
        return (
            <main className='depth-1' id='dashboard'>
                <aside className='depth-2'>
                    <ul>
                        <li><Link to='/dashboard/shops'>Shops</Link></li>
                        <li><Link to='/dashboard/items'>Items</Link></li>
                        <li>Inventory</li>
                        <li><Link to='/dashboard/employees'>Employees</Link></li>
                    </ul>
                </aside>
                <div id='main'>
                    <Route path='/dashboard' component={Guide} exact />
                    <Route path='/dashboard/shops' component={Shops} />
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

const Shops = (props) => {
    return (
        <section className='card'>
            <h2>Add New Shops</h2>
        </section>
    )
}

const Items = (props) => {
    return (
        <React.Fragment>
            <section className='card depth-3'>
                <h2>Add New Items</h2>
                <div>
                    <div className='form-group'>
                        <label>Name (required)</label>
                        <input className='form-control' name='name' placeholder='New Item Name' type='text' required />
                    </div>

                    <div className='form-group'>
                        <label>Barcode</label>
                        <input className='form-control' name='name' placeholder='New Item Barcode' type='text' />
                    </div>

                    <div className='form-group'>
                        <label>Price (required)</label>
                        <input className='form-control' name='name' placeholder='New Item Price' type='number' required />
                    </div>

                    <div className='form-group'>
                        <label>Description</label>
                        <textarea className='form-control' name='description' placeholder='Description' />
                    </div>

                    <div className='form-group'>
                        <button>Submit</button>
                    </div>
                </div>
            </section>

            <section className='card depth-3'>
                <h2>List of Items</h2>
                <div>
                    <p>Click on an item to edit its details.</p>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Bardcode</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Dashboard