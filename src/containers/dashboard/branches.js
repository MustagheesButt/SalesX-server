import React from 'react'
import { Route, Link } from 'react-router-dom'

import http from '../../services/httpService'

import NewBranchForm from '../../components/forms/newBranchForm'
import ValueItem from '../../components/common/valueItem'
import Editable from '../../components/common/editable'

const apiEndpoint = '/branches'

const Branches = (props) => {
    return (
        <React.Fragment>
            <Route path='/dashboard/branches' exact component={AllBranches} />
            <Route path='/dashboard/branches/new-branch' component={NewBranch} />
            <Route path='/dashboard/branches/:branchId' component={BranchDetails} />
        </React.Fragment>
    )
}

class AllBranches extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            branches: []
        }
    }

    async populateBranches() {
        try {
            const { data: branches } = await http.get(apiEndpoint)
            this.setState({ branches })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async componentDidMount() {
        this.populateBranches()
    }

    render() {
        const branches = this.state.branches.map(branch => {
            return (
                <section className='card depth-3' key={branch._id}>
                    <div className='d-flex' style={{ justifyContent: 'space-around' }}>
                        <ValueItem label='Name' value={branch.name} />
                        <ValueItem label='Business Email' value={branch.businessEmail || 'N/A'} />
                        <ValueItem label='Phone Number' value={branch.phoneNumber || 'N/A'} />
                        <ValueItem label='Address' value={branch.address || 'N/A'} />
                    </div>

                    <Link to={`/dashboard/branches/${branch._id}`}>View Details</Link>
                </section>
            )
        })

        return (
            <section className='card depth-2'>
                <h2>Manage Branches</h2>
                <Link to='/dashboard/branches/new-branch'>Create New Branch</Link>
                <div>
                    {branches}
                </div>
            </section>
        )
    }
}

class NewBranch extends React.Component {
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
                    <h2>Create a New Branch</h2>
                    <div>
                        <NewBranchForm brands={this.state.brands} />
                    </div>
                </section>
            )
        }

        return (
            <section className='card depth-3'>
                <h2>Oops! Looks like you don't have any brands yet.</h2>
                <p>Create at least one brand first, so you can add that brand's branches.</p>
            </section>
        )
    }
}

class BranchDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            branch: null,
            items: [],
            employees: []
        }

        this.branchId = this.props.match.params.branchId
    }

    async componentDidMount() {
        try {
            const { data: branch } = await http.get(`/branches/${this.branchId}`)
            const { data: employees } = await http.get(`/branches/${this.branchId}/employees`)
            const { data: items } = await http.get('/items')

            this.setState({ branch, employees, items })
        } catch (ex) {
            console.log(ex)
        }
    }

    async updateQuantity(itemId, value) {
        const oldBranch = this.state.branch
        try {
            const branch = this.state.branch
            const itemIndex = branch.inventory.findIndex(x => x.itemId === itemId)
            if (itemIndex === -1)
                branch.inventory.push({ itemId, quantity: value })
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

    render() {
        if (this.state.branch)
            return this.renderBranchDetails()
        else
            return (
                <section className='card depth-2'>
                    <p>Loading info...</p>
                </section>
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
        const inventoryItems = this.state.items.map(item => {
            const quantity = this.state.branch.inventory.find(x => x.itemId === item._id)?.quantity
            return (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td><Editable id={item._id} changeHandler={(itemId, value) => this.updateQuantity(itemId, value) }>{quantity || 0}</Editable></td>
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

                <section className='card depth-3'>
                    <h3>Inventory</h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems}
                        </tbody>
                    </table>
                </section>
            </section>
        )
    }
}

export default Branches