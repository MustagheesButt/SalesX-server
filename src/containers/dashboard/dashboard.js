import React from 'react'
import { Route, NavLink, Link } from 'react-router-dom'
import Chart from 'chart.js'

import http from '../../services/httpService'
import notificationService from '../../services/notificationService'

import Main from '../../components/templates/main'
import Loading from '../../components/common/loading'

import Items from './items'
import Brands from './brands'
import Branches from './branches'
import Employees from './employees'
import Invoices from './invoices'
import Statistics from './statistics'

import './dashboard.css'

const Dashboard = () => {
    return (
        <Main>
            <main className='depth-1 grid-container' id='dashboard'>
                <aside className='depth-2'>
                    <ul>
                        <li><NavLink to='/dashboard' exact>Dashboard</NavLink></li>
                        <li><NavLink to='/dashboard/brands'>Brands</NavLink></li>
                        <li><NavLink to='/dashboard/branches'>Branches</NavLink></li>
                        <li><NavLink to='/dashboard/items'>Items</NavLink></li>
                        <li><NavLink to='/dashboard/employees'>Employees</NavLink></li>
                        <li><NavLink to='/dashboard/invoices'>Invoices</NavLink></li>
                        <li><NavLink to='/dashboard/statistics'>Statistics</NavLink></li>
                    </ul>
                </aside>
                <div id='main'>
                    <Route path='/dashboard' component={DashboardHome} exact />
                    <Route path='/dashboard/brands' component={Brands} />
                    <Route path='/dashboard/branches' component={Branches} />
                    <Route path='/dashboard/items' component={Items} />
                    <Route path='/dashboard/employees' component={Employees} />
                    <Route path='/dashboard/invoices' component={Invoices} />
                    <Route path='/dashboard/statistics' component={Statistics} />
                </div>
            </main>
        </Main>
    )
}

class DashboardHome extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: null,
            branches: null,
            employees: null,
            invoices: [],
            lowStockBranches: []
        }
    }

    async componentDidMount() {
        document.title = `Dashboard | ${process.env.REACT_APP_NAME}`

        try {
            const { data: brands } = await http.get('/brands')
            if (brands.length === 0) return this.setState({ brands })

            const { data: branches } = await http.get('/branches')
            if (branches.length === 0) return this.setState({ brands, branches })

            const { data: employees } = await http.get('/employees')
            if (employees.length === 0) return this.setState({ brands, branches, employees })

            const { data: invoices } = await http.get('/invoices/latest')

            this.setState({ brands, branches, employees, invoices })
        } catch ({ response }) {
            if (response)
                notificationService.alertDanger(response)
        }

        if (this.state.invoices.length > 0) {
            const cumulativeSales = this.state.invoices.reduce((sales, invoice) => {
                const createdAt = new Date(invoice.createdAt).toLocaleDateString()
                if (sales[createdAt])
                    sales[createdAt] += invoice.amountPaid
                else
                    sales[createdAt] = invoice.amountPaid
                return sales
            }, {})

            this.drawSalesChart(cumulativeSales)
        }
    }

    drawSalesChart(sales) {
        const labels = Object.keys(sales)
        const data = Object.values(sales)

        const ctx = document.getElementById('sales-chart')
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Net Sales per Day',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }

    render() {
        if (this.state.brands === null) return <Loading />
        else if (this.state.brands.length === 0) return this.renderNewComerGuide()

        if (this.state.branches === null) return <Loading />
        else if (this.state.branches.length === 0) return this.renderNewComerGuide('branch')

        if (this.state.employees === null) return <Loading />
        else if (this.state.employees.length === 0) return this.renderNewComerGuide('employee')

        const invoices = this.state.invoices.map(invoice => {
            return (
                <tr key={invoice._id}>
                    <td>{invoice._id}</td>
                    <td>{invoice.amountPaid}</td>
                    <td>{new Date(invoice.createdAt).toLocaleString()}</td>
                    <td>{invoice.branch.name}</td>
                </tr>
            )
        })

        const lowStockBranches = this.state.lowStockBranches.map(branch => {
            return (
                <p key={branch._id}>{branch.name}</p>
            )
        })

        const renderInvoicesChart = this.state.invoices.length > 0
        const renderLatestInvoices = invoices.length > 0
        const renderLowStockBranches = lowStockBranches.length > 0

        return (
            <React.Fragment>
                {renderInvoicesChart ?
                    <section className='card depth-2'>
                        <h3>Gross Sales per Day</h3>

                        <Link to='/dashboard/statistics'>More Statistics</Link>

                        <canvas id='sales-chart'></canvas>
                    </section>
                    : ''}

                <div className='d-flex'>
                    {renderLowStockBranches ?
                        <section className='card depth-2'>
                            <h3>Branches Low on Stock</h3>
                            {lowStockBranches}
                        </section>
                        : ''}

                    <section className='card depth-2' style={{ flexGrow: '1' }}>
                        <h3>Employee Status</h3>
                        <p><em>Coming soon</em></p>
                    </section>
                </div>

                {renderLatestInvoices ?
                    <section className='card depth-2'>
                        <h3>Latest Invoices</h3>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount Paid (USD)</th>
                                    <th>Date/Time</th>
                                    <th>Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices}
                            </tbody>
                        </table>
                        <Link to='/dashboard/invoices'>View All</Link>
                    </section>
                    : ''}
            </React.Fragment >
        )
    }

    renderNewComerGuide(step) {
        if (step === 'branch')
            return (
                <section className='card depth-2'>
                    <h2>Next Step: <Link to='/dashboard/branches'>Create Your First Branch</Link></h2>
                    <p>Once you have created at least one branch, you can add employees who can login to SalesX Client and start working.</p>
                    <p>Need help or stuck somewhere? See our <Link to='/help'>detailed guide</Link> and <Link to='help/faq'>help</Link> section.</p>
                </section>
            )
        else if (step === 'employee')
            return (
                <section className='card depth-2'>
                    <h2>Almost There: <Link to='/dashboard/employees'>Add an Employee</Link></h2>
                    <p>Adding an employee allows the employee to login to SalesX Client and start working.</p>
                    <p>Need help or stuck somewhere? See our <Link to='/help'>detailed guide</Link> and <Link to='help/faq'>help</Link> section.</p>
                </section>
            )

        return (
            <section className='card depth-2'>
                <h2>New here?</h2>
                <p>No need to worry! Get started right now by <Link to='/dashboard/brands'>creating your first brand</Link>.</p>
                <p>Need help or stuck somewhere? See our <Link to='/help'>detailed guide</Link> and <Link to='help/faq'>help</Link> section.</p>
            </section>
        )
    }
}

export default Dashboard