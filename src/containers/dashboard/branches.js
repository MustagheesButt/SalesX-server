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
                    <td>{branch._id}</td><td>{branch.name}</td><td>{branch.businessEmail || 'N/A'}</td><td>{branch.phoneNumber}</td><td>{branch.address || 'N/A'}</td><td>{branch.description || 'N/A'}</td>
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Business Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Description</th>
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

const NewBranch = (props) => {
    return (
        <section className='card depth-3'>
            <h2>Create a New Branch</h2>
            <div>
                <NewBranchForm />
            </div>
        </section>
    )
}

export default Branches