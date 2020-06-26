import React from 'react'
import { Route, Link } from 'react-router-dom'

import http from '../../services/httpService'

import XSelect from '../../components/common/xui/xselect'
import XInput from '../../components/common/xui/xinput'
import Loading from '../../components/common/loading'
import NewItemForm from '../../components/forms/newItemForm'

const apiEndpoint = '/items'

const Items = () => {
    return (
        <React.Fragment>
            <Route path='/dashboard/items' exact component={AllItems} />
            <Route path='/dashboard/items/new-item' component={NewItem} />
        </React.Fragment>
    )
}

function renderNoBrandsMsg() {
    return (
        <section className='card depth-2'>
            <h2>Looks like you don't have any brands yet.</h2>
            <p>Create at least one brand first, so you can add the items/products associated with that particular brand.</p>
        </section>
    )
}

class AllItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: null,
            itemsFilter: '',
            brands: null,
            selectedBrandId: ''
        }
    }

    async populateItems() {
        this.setState({ items: null })

        try {
            let items = []
            if (this.state.selectedBrandId === '0')
                items = (await http.get(apiEndpoint)).data
            else
                items = (await http.get(apiEndpoint + `?brand=${this.state.selectedBrandId}`)).data

            this.setState({ items })
        } catch (err) {
            console.log(err)
        }
    }

    async populateBrands() {
        try {
            const { data: brands } = await http.get('/brands')

            brands.unshift({ _id: '0', name: 'All' })
            this.setState({ brands })
        } catch ({ response }) {
            console.log(response.data)
        }
    }

    async componentDidMount() {
        document.title = `Items | ${process.env.REACT_APP_NAME}`

        await this.populateBrands()

        // set selected brand
        let selectedBrandIndex = 0
        if (this.props.location.search.indexOf('brand') !== -1) {
            const brand = this.state.brands.findIndex(b => b._id === this.props.location.search.split('=')[1])
            if (brand >= 0)
                selectedBrandIndex = brand
        }
        this.setState({ selectedBrandId: this.state.brands[selectedBrandIndex]._id })

        this.populateItems()
    }

    brandSelectHandler = (e) => {
        const selectedBrand = this.state.brands.find(brand => brand._id === e.target.value)
        this.setState({ selectedBrandId: selectedBrand._id }, this.populateItems)
    }

    renderItemsList() {
        if (this.state.items === null) return <Loading />
        else if (this.state.items.length === 0)
            return (
                <section className='card depth-2'>
                    <em>Current selection does not have any items.</em>
                </section>
            )

        const itemsList = this.state.items
            .filter(item =>
                item.name.toLowerCase().includes(this.state.itemsFilter.toLowerCase()) || item.barcode.includes(this.state.itemsFilter)
            ).map(item => {
                return (
                    <tr key={item._id}>
                        <td>{item.name}</td><td>{item.barcode || 'N/A'}</td><td>{item.price}</td><td>{item.description || 'N/A'}</td>
                    </tr>
                )
            })

        return (
            <section className='card depth-2'>
                <XInput
                    name='filter'
                    placeholder='Filter Items'
                    value={this.state.itemsFilter}
                    onChange={(e) => this.setState({ itemsFilter: e.target.value })} />

                {itemsList.length === 0 ?
                    <p>Your search did not yeild any results.</p> :
                    <table style={{ width: '100%' }}>
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
                                <th>Name</th>
                                <th>Barcode</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsList}
                        </tbody>
                    </table>}
            </section>
        )
    }

    render() {
        if (this.state.brands === null) return <Loading />

        if (this.state.brands.length <= 1) return renderNoBrandsMsg()

        const brandsList = this.state.brands.map(brand => {
            return (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
            )
        })

        return (
            <React.Fragment>
                <section className='card depth-2'>
                    <h2>Manage Items</h2>
                    <Link to='/dashboard/items/new-item'>Add New Item</Link>

                    <div className='mt-15'>
                        <XSelect label='Select a Brand' name='brand' value={this.state.selectedBrandId} options={brandsList} onChange={this.brandSelectHandler} />
                    </div>
                </section>

                {this.renderItemsList()}
            </React.Fragment>
        )
    }
}

class NewItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: null
        }
    }

    async componentDidMount() {
        document.title = `New Item | ${process.env.REACT_APP_NAME}`

        const { data: brands } = await http.get('/brands')
        this.setState({ brands })
    }

    render() {
        if (this.state.brands === null) return <Loading />

        if (this.state.brands.length === 0) return renderNoBrandsMsg()

        return (
            <section className='card depth-2'>
                <h2>Add New Items</h2>
                <div>
                    <NewItemForm brands={this.state.brands} />
                </div>
            </section>
        )
    }
}

export default Items