import React from 'react'
import { Route } from 'react-router-dom'

import http from '../../services/httpService'

import XSelect from '../../components/common/xui/xselect'
import XInput from '../../components/common/xui/xinput'
import Loading from '../../components/common/loading'

const apiEndpoint = '/invoices'

const Invoices = () => {
    return (
        <React.Fragment>
            <Route path='/dashboard/invoices' exact component={AllInvoices} />
        </React.Fragment>
    )
}

class AllInvoices extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            invoices: null,
            invoicesFilter: '',
            brands: null,
            selectedBrand: '',
            branches: null,
            selectedBranch: ''
        }
    }

    async populateBrands() {
        try {
            const { data: brands } = await http.get('/brands')
            this.setState({ brands, selectedBrand: brands[0]?._id || '' })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async populateBranches() {
        this.setState({ branches: null })

        try {
            const { data: branches } = await http.get(`/branches?brand=${this.state.selectedBrand}`)

            branches.unshift({ _id: '0', name: 'All' })
            this.setState({ branches, selectedBranch: branches[0]._id })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async populateInvoices() {
        this.setState({ invoices: null })

        try {
            let invoices = []
            if (this.state.selectedBranch && this.state.selectedBranch !== '0')
                invoices = (await http.get(`${apiEndpoint}?brand=${this.state.selectedBrand}&branch=${this.state.selectedBranch}`)).data
            else
                invoices = (await http.get(`${apiEndpoint}?brand=${this.state.selectedBrand}`)).data

            this.setState({ invoices })
        } catch (err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        document.title = `Invoices | ${process.env.REACT_APP_NAME}`

        await this.populateBrands()
        await this.populateBranches()

        this.populateInvoices()
    }

    brandSelectHandler = (e) => {
        const selectedBrand = (this.state.brands.find(brand => brand._id === e.target.value))._id
        this.setState({ selectedBrand }, async () => {
            await this.populateBranches()
            this.populateInvoices()
        })
    }

    branchSelectHandler = (e) => {
        const selectedBranch = (this.state.branches.find(branch => branch._id === e.target.value))._id
        this.setState({ selectedBranch }, this.populateInvoices)
    }

    render() {
        if (this.state.brands === null || this.state.branches === null) return <Loading />

        if (this.state.brands.length === 0) return this.renderNoBrandsMsg()
        else if (this.state.branches.length <= 1) return this.renderNoBranchMsg()

        const brandsList = this.state.brands.map(brand => {
            return (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
            )
        })

        const branchesList = this.state.branches.map(branch => {
            return (
                <option key={branch._id} value={branch._id}>{branch.name}</option>
            )
        })


        return (
            <>
                <section className='card depth-2'>
                    <h2>Manage Invoices</h2>

                    <div className='d-flex mt-15'>
                        <div className='flex-child'>
                            <XSelect label='Select a Brand' name='brand' value={this.state.selectedBrand} options={brandsList} onChange={this.brandSelectHandler} />
                        </div>
                        <div className='flex-child'>
                            <XSelect label='Select a Branch' name='branch' options={branchesList} onChange={this.branchSelectHandler} />
                        </div>
                    </div>
                </section>

                {this.renderInvoicesList()}
            </>
        )
    }

    renderNoBrandsMsg() {
        return (
            <section className='card depth-2'>
                <h2>Looks like you don't have any brands yet.</h2>
                <p>Create at least one brand first, then add some items and branches.</p>
            </section>
        )
    }

    renderNoBranchMsg() {
        return (
            <section className='card depth-2'>
                <h2>Looks like you don't have any branches yet.</h2>
                <p>Create at least one branch first, then you can start adding new employees. When one of your employees logs in to SalesX client and generates an invoice, that invoice data will be displayed here.</p>
            </section>
        )
    }

    renderInvoicesList() {
        if (this.state.invoices === null) return <Loading />

        const invoicesList = this.state.invoices
            .filter(invoice => invoice._id.toLowerCase().includes(this.state.invoicesFilter.toLowerCase()))
            .map(invoice => {
                return (
                    <tr key={invoice._id}>
                        <td>{invoice._id}</td><td>{invoice.discount}</td><td>{invoice.paymentMethod}</td><td>{new Date(invoice.createdAt).toLocaleString()}</td>
                    </tr>
                )
            })

        return (
            <section className='card depth-2'>
                {this.state.invoices.length > 0 ?
                    <div>
                        <XInput
                            name='filter'
                            placeholder='Filter Invoices'
                            value={this.state.invoicesFilter}
                            onChange={(e) => this.setState({ invoicesFilter: e.target.value })} />

                        <table style={{ width: '100%' }}>
                            <thead style={{ textAlign: 'left' }}>
                                <tr>
                                    <th>ID</th>
                                    <th>Discount</th>
                                    <th>Payment Method</th>
                                    <th>Generated At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoicesList}
                            </tbody>
                        </table>
                    </div>
                    : <em>Current selection does not have any invoices yet.</em>}
            </section>
        )
    }
}

export default Invoices