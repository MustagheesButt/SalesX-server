import React from 'react'
import { Route } from 'react-router-dom'

import http from '../../services/httpService'

import NewEmployeeForm from '../../components/forms/newEmployeeForm'

const apiEndpoint = '/employees'

const Employees = (props) => {
    return (
        <React.Fragment>
            <Route path='/dashboard/employees' exact component={AllEmployees} />
            <Route path='/dashboard/employees/new-employee' component={NewEmployee} />
        </React.Fragment>
    )
}

class AllEmployees extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
    }

    async populateEmployees() {
        try {
            const { data: employees } = await http.get(apiEndpoint)
            this.setState({ employees })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async componentDidMount() {
        this.populateEmployees()
    }

    render() {
        const employeesList = this.state.employees.map(employee => {
            return (
                <tr key={employee._id}>
                    <td>{employee.firstName} {employee.lastName}</td><td>{employee.email || 'N/A'}</td><td>{employee.phoneNumber || 'N/A'}</td><td>{employee.title || 'N/A'}</td><td>{employee.salary || 'N/A'}</td>
                </tr>
            )
        })

        return (
            <section className='card depth-3'>
                <h2>Your Employees</h2>
                <div>
                    <p>Click on an employee to edit its details.</p>
                    <table style={{ width: '100%' }}>
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Title</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeesList}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class NewEmployee extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: [],
            branches: []
        }
    }

    async componentDidMount() {
        const { data: brands } = await http.get('/brands')
        const { data: branches } = await http.get('/branches')
        this.setState({ brands, branches })
    }

    render() {
        if (this.state.brands.length > 0) {
            return (
                <section className='card depth-3'>
                    <h2>Add a New Employee</h2>
                    <div>
                        <NewEmployeeForm brands={this.state.brands} branches={this.state.branches} />
                    </div>
                </section>
            )
        }

        return (
            <section className='card depth-3'>
                <h2>Oops! Looks like you don't have any brands/branches yet.</h2>
                <p>Create at least one brand and one branch first, so you can add new employees.</p>
            </section>
        )
    }
}

export default Employees