import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import http from '../../services/httpService'

import NewBranchForm from '../../components/forms/newBranchForm'
import ValueItem from '../../components/common/valueItem'
import Editable from '../../components/common/editable'
import XSelect from '../../components/common/xui/xselect'
import Loading from '../../components/common/loading'

const apiEndpoint = '/branches'

const Branches = () => {
    return (
        <Switch>
            <Route path='/dashboard/branches' exact component={AllBranches} />
            <Route path='/dashboard/branches/new-branch' exact component={NewBranch} />
            <Route path='/dashboard/branches/:branchId' exact component={BranchDetails} />
            <Route path='/dashboard/branches/:branchId/inventory' component={BranchInventory} />
        </Switch>
    )
}

class AllBranches extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: null,
            branches: null,
            selectedBrandId: ''
        }
    }

    async populateBranches() {
        try {
            this.setState({ branches: null })
            let branches = []
            if (this.state.selectedBrandId === '0')
                branches = (await http.get(apiEndpoint)).data
            else
                branches = (await http.get(`${apiEndpoint}?brand=${this.state.selectedBrandId}`)).data

            this.setState({ branches })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async populateBrands() {
        try {
            const { data: brands } = await http.get('/brands')

            if (brands.length > 0) {
                brands.unshift({ _id: '0', name: 'All' })
                this.setState({ brands })
            }
        } catch ({ response }) {
            console.log(response.data)
        }
    }

    async componentDidMount() {
        document.title = `Branches | ${process.env.REACT_APP_NAME}`

        await this.populateBrands()

        // set selected brand
        let selectedBrandIndex = 0
        if (this.props.location.search.indexOf('brand') !== -1) {
            const brand = this.state.brands.findIndex(b => b._id === this.props.location.search.split('=')[1])
            if (brand >= 0)
                selectedBrandIndex = brand
        }
        this.setState({ selectedBrandId: this.state.brands[selectedBrandIndex]._id })

        this.populateBranches()
    }

    brandSelectHandler = (e) => {
        const selectedBrand = this.state.brands.find(brand => brand._id === e.target.value)
        this.setState({ selectedBrandId: selectedBrand._id }, this.populateBranches)
    }

    renderNoBrandsMsg() {
        return (
            <section className='card depth-2'>
                <h2>No Brands :(</h2>
                <p>It looks like you don't have any brands yet. Create at least 1, then come here.</p>
            </section>
        )
    }

    render() {
        if (this.state.brands === null) return <Loading />

        if (this.state.brands.length === 0) return this.renderNoBrandsMsg()

        return (
            <React.Fragment>
                <section className='card depth-2'>
                    <h2>Manage Branches</h2>
                    <Link to='/dashboard/branches/new-branch'>Create New Branch</Link>

                    {this.renderBrandsSelector()}
                </section>

                {this.state.branches === null ? <Loading /> :
                    <section className='card depth-2'>
                        {this.state.branches.length === 0 ?
                            <p><em>You have not created any branches yet.</em></p> :
                            <div>
                                {this.renderBranches()}
                            </div>
                        }
                    </section>}
            </React.Fragment>
        )
    }

    renderBrandsSelector() {
        const brandsList = this.state.brands.map(brand => {
            return (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
            )
        })

        return (
            <div className='mt-15'>
                <XSelect label='Select a Brand' name='brand' value={this.state.selectedBrandId} options={brandsList} onChange={this.brandSelectHandler} />
            </div>
        )
    }

    renderBranches() {
        return this.state.branches?.map(branch => {
            return (
                <section className='card depth-3' key={branch._id}>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <ValueItem label='Name' value={branch.name} />
                        <ValueItem label='Business Email' value={branch.businessEmail || 'N/A'} />
                        <ValueItem label='Phone Number' value={branch.phoneNumber || 'N/A'} />
                        <ValueItem label='Address' value={branch.address || 'N/A'} />
                    </div>

                    <Link className='btn' to={`/dashboard/branches/${branch._id}`}>Edit</Link>
                    <Link className='btn' to={`/dashboard/branches/${branch._id}/inventory`}>View Inventory</Link>
                    <Link className='btn' to={`/dashboard/employees?branch=${branch._id}`}>View Employees ({branch.employees.length})</Link>
                </section>
            )
        })
    }
}

class NewBranch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: null
        }
    }

    async componentDidMount() {
        document.title = `New Branch | ${process.env.REACT_APP_NAME}`

        const { data: brands } = await http.get('/brands')
        this.setState({ brands })
    }

    render() {
        if (this.state.brands === null)
            return <Loading />

        return this.state.brands.length > 0 ?
            <section className='card depth-2'>
                <h2>Create a New Branch</h2>
                <div>
                    <NewBranchForm brands={this.state.brands} />
                </div>
            </section> :
            <section className='card depth-2'>
                <h2>Looks like you don't have any brands yet.</h2>
                <p>Create at least one brand first, so you can add that brand's branches.</p>
            </section>
    }
}

class BranchDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            branch: null,
            employees: []
        }

        this.branchId = this.props.match.params.branchId
    }

    async componentDidMount() {
        try {
            const { data: branch } = await http.get(`/branches/${this.branchId}`)

            document.title = `${branch.name} Details | ${process.env.REACT_APP_NAME}`

            const { data: employees } = await http.get(`/branches/${this.branchId}/employees`)
            this.setState({ branch, employees })
        } catch (ex) {
            document.title = `Branch Not Found | ${process.env.REACT_APP_NAME}`
            console.log(ex)
        }
    }

    render() {
        if (this.state.branch)
            return this.renderBranchDetails()
        else
            return (
                <Loading />
            )
    }

    renderBranchDetails() {
        const employees = this.state.employees.map(employee => {
            return (
                <tr key={employee._id}>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.email || 'N/A'}</td>
                    <td>{employee.phoneNumber || 'N/A'}</td>
                </tr>
            )
        })

        return (
            <section className='card depth-2'>
                <h1>Details for {this.state.branch.address}</h1>

                <section className='card depth-3'>
                    <h3>Employees</h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees}
                        </tbody>
                    </table>
                </section>
            </section>
        )
    }
}

class BranchInventory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            branch: null,
            items: null
        }

        this.branchId = this.props.match.params.branchId
    }

    async componentDidMount() {
        try {
            const { data: branch } = await http.get(`/branches/${this.branchId}`)
            const { data: items } = await http.get(`/items?brand=${branch.brand}`)

            this.setState({ branch, items })

            document.title = `${branch.name}'s Inventory | ${process.env.REACT_APP_NAME}`
        } catch (ex) {
            console.log(ex)
        }
    }

    render() {
        if (this.state.branch)
            return this.renderBranchInventory()
        else
            return <Loading />
    }

    async updateQuantity(item, value) {
        const oldBranch = this.state.branch
        try {
            const branch = this.state.branch
            const itemIndex = branch.inventory.findIndex(x => x.item === item)
            if (itemIndex === -1)
                branch.inventory.push({ item, quantity: value })
            else
                branch.inventory[itemIndex].quantity = value

            this.setState({ branch })
            const { data } = await http.put(`${apiEndpoint}/${this.branchId}/inventory`, branch.inventory)
            console.log(data)
        } catch (ex) {
            console.log(ex)
            this.setState({ branch: oldBranch })
        }
    }

    renderBranchInventory() {
        return (
            <section className='card depth-2'>
                <h3>{this.state.branch.name}'s Inventory</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items === null ? <Loading /> :
                            this.state.items.length === 0 ?
                                <p>Nothing to see here</p> :
                                this.renderBranchInventoryItems()}
                    </tbody>
                </table>
            </section>
        )
    }

    renderBranchInventoryItems() {
        return this.state.items?.map(item => {
            const quantity = this.state.branch.inventory.find(x => x.item === item._id)?.quantity
            return (
                <tr key={item._id} style={{ lineHeight: '32px' }}>
                    <td>{item.name}</td>
                    <td><Editable id={item._id} changeHandler={(itemId, value) => this.updateQuantity(itemId, value)}>{quantity || 0}</Editable></td>
                </tr>
            )
        })
    }
}

export default Branches