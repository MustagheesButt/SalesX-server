import React from 'react'
import { Route } from 'react-router-dom'

import http from '../../services/httpService'

import NewItemForm from '../../components/forms/newItemForm'

const apiEndpoint = 'http://localhost:5000/api/items'

class Items extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path='/dashboard/items' exact component={AllItems} />
                <Route path='/dashboard/items/new-item' component={NewItem} />
            </React.Fragment>
        )
    }
}

class AllItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
    }

    async populateItems() {
        try {
            const { data: items } = await http.get(apiEndpoint)
            this.setState({ items })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async componentDidMount() {
        this.populateItems()
    }

    render() {
        const itemsList = this.state.items.map(item => {
            return (
                <tr key={item._id}>
                    <td>{item._id}</td><td>{item.name}</td><td>{item.barcode || 'N/A'}</td><td>{item.price}</td><td>{item.description || 'N/A'}</td>
                </tr>
            )
        })

        return (
            <section className='card depth-3'>
                <h2>List of Items</h2>
                <div>
                    <p>Click on an item to edit its details.</p>
                    <table style={{ width: '100%' }}>
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Bardcode</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsList}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

const NewItem = (props) => {
    return (
        <section className='card depth-3'>
            <h2>Add New Items</h2>
            <div>
                <NewItemForm />
            </div>
        </section>
    )
}

export default Items