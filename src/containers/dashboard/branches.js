import React from 'react'
import { Route } from 'react-router-dom'

import http from '../../services/httpService'

import NewBranchForm from '../../components/forms/newBranchForm'

const apiEndpoint = '/branches'

const Branches = (props) => {
    return (
        <React.Fragment>
            <Route path='/dashboard/branches' exact component={AllBranches} />
            <Route path='/dashboard/branches/new-branch' component={NewBranch} />
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
        const branchesList = this.state.branches.map(branch => {
            return (
                <tr key={branch._id}>
                    <td>{branch.name}</td><td>{branch.businessEmail || 'N/A'}</td><td>{branch.phoneNumber || 'N/A'}</td><td>{branch.address || 'N/A'}</td>
                </tr>
            )
        })

        return (
            <section className='card depth-3'>
                <h2>Your Branches</h2>
                <div>
                    <p>Click on a branch to edit its details.</p>
                    <table style={{ width: '100%' }}>
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
                                <th>Name</th>
                                <th>Business Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branchesList}
                        </tbody>
                    </table>
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

export default Branches