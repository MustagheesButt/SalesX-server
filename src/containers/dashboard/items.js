import React from 'react'
import { Route } from 'react-router-dom'

import http from '../../services/httpService'

import NewItemForm from '../../components/forms/newItemForm'

const apiEndpoint = '/items'

const Items = (props) => {
    return (
        <React.Fragment>
            <Route path='/dashboard/items' exact component={AllItems} />
            <Route path='/dashboard/items/new-item' component={NewItem} />
        </React.Fragment>
    )
}

class AllItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            brands: [],
            selectedBrand: ''
        }
    }

    // TODO: decide whether to fetch all items of all users' brands, or just one brand's at a time
    async populateItems() {
        try {
            const { data: items } = await http.get(apiEndpoint + `?brandId=${this.state.selectedBrand._id}`)
            const filtered = items // items.filter(item => item.brandId === this.state.selectedBrand._id)
            this.setState({ items: filtered })
        } catch (err) {
            console.log(err)
            //console.error(response.data)
        }
    }

    async populateBrands() {
        try {
            const { data: brands } = await http.get('/brands')

            if (brands.length > 0)
                this.setState({ brands, selectedBrand: brands[0] })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async componentDidMount() {
        await this.populateBrands()
        this.populateItems()
    }

    brandSelectHandler = (e) => {
        const selectedBrand = this.state.brands.find(brand => brand._id === e.target.value)
        this.setState({ selectedBrand: selectedBrand }, this.populateItems)
    }

    renderNoBrandsMsg() {
        return (
            <section className='card depth-3'>
                <h2>Oops! Looks like you don't have any brands yet.</h2>
                <p>Create at least one brand first, so you can add the items/products associated with that particular brand.</p>
            </section>
        )
    }

    renderItemsList() {
        const itemsList = this.state.items.map(item => {
            return (
                <tr key={item._id}>
                    <td>{item.name}</td><td>{item.barcode || 'N/A'}</td><td>{item.price}</td><td>{item.description || 'N/A'}</td>
                </tr>
            )
        })

        const brandsList = this.state.brands.map(brand => {
            return (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
            )
        })

        return (
            <section className='card depth-3'>
                <h2>List of Items</h2>
                <div>
                    <select name='brand' onChange={this.brandSelectHandler}>
                        {brandsList}
                    </select>
                    <p>Click on an item to edit its details.</p>
                    <table style={{ width: '100%' }}>
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
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

    render() {
        if (this.state.brands.length > 0) {
            return this.renderItemsList()
        }

        return this.renderNoBrandsMsg()
    }
}

class NewItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: []
        }
    }

    async componentDidMount() {
        const { data: brands } = await http.get('/brands')
        this.setState({ brands })
    }

    render() {
        if (this.state.brands.length > 0) {
            return (
                <section className='card depth-3'>
                    <h2>Add New Items</h2>
                    <div>
                        <NewItemForm brands={this.state.brands} />
                    </div>
                </section>
            )
        }

        return (
            <section className='card depth-3'>
                <h2>Oops! Looks like you don't have any brands yet.</h2>
                <p>Create at least one brand first, so you can add the items/products associated with that particular brand.</p>
            </section>
        )
    }
}

export default Items