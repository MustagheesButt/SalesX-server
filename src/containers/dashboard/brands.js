import React, { useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import http from '../../services/httpService'

import NewBrandForm from '../../components/forms/newBrandForm'
import ValueItem from '../../components/common/valueItem'
import Editable from '../../components/common/editable'
import Loading from '../../components/common/loading'

const apiEndpoint = '/brands'

const Brands = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path='/dashboard/brands' exact component={AllBrands} />
                <Route path='/dashboard/brands/new-brand' exact component={NewBrand} />
                <Route path='/dashboard/brands/:brandId' component={BrandDetails} />
            </Switch>
        </React.Fragment>
    )
}

class AllBrands extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: null
        }
    }

    async componentDidMount() {
        document.title = `Brands | ${process.env.REACT_APP_NAME}`

        this.populateBrands()
    }

    async populateBrands() {
        try {
            const { data: brands } = await http.get(apiEndpoint)

            this.setState({ brands })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    render() {
        return (
            <section className='card depth-2'>
                <h2>Manage Brands</h2>

                <Link to='/dashboard/brands/new-brand'>Create New Brand</Link>

                <div>
                    {this.state.brands === null ? <Loading /> :
                        this.state.brands.length > 0 ? this.renderBrandsList() :
                            <p>Nothing to see here :(</p>}
                </div>
            </section>
        )
    }

    renderBrandsList() {
        return this.state.brands?.map(brand => {
            return (
                <section className='card depth-3' key={brand._id}>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <ValueItem label='Name' value={brand.name} />
                        <ValueItem label='Business Email' value={brand.businessEmail || 'N/A'} />
                        <ValueItem label='Phone Number' value={brand.phoneNumber || 'N/A'} />
                        <ValueItem label='Website' value={brand.website || 'N/A'} />
                    </div>

                    {brand.description ? <p>{brand.description}</p> : ''}

                    <Link className='btn' to={`/dashboard/brands/${brand._id}`}>Edit</Link>
                    <Link className='btn' to={`/dashboard/items?brand=${brand._id}`}>View Items ({brand.items.length})</Link>
                    <Link className='btn' to={`/dashboard/branches?brand=${brand._id}`}>View Branches ({brand.branches.length})</Link>
                    <Link className='btn' to={`/dashboard/employees?brand=${brand._id}`}>View Employees ({brand.employees.length})</Link>
                </section>
            )
        })
    }
}

const NewBrand = () => {
    useEffect(() => {
        document.title = `New Brand | ${process.env.REACT_APP_NAME}`
    })

    return (
        <section className='card depth-2'>
            <h2>Create a New Brand</h2>
            <div>
                <NewBrandForm />
            </div>
        </section>
    )
}

class BrandDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brand: null,
        }

        this.brandId = this.props.match.params.brandId
    }

    async componentDidMount() {
        try {
            const { data: brand } = await http.get(`/brands/${this.brandId}`)
            this.setState({ brand })

            document.title = `${brand.name} | ${process.env.REACT_APP_NAME}`
        } catch (ex) {
            document.title = `Brand Not Found | ${process.env.REACT_APP_NAME}`
            console.log(ex)
        }
    }

    render() {
        if (this.state.brand)
            return this.renderBrandDetails()
        else
            return (
                <Loading />
            )
    }

    renderBrandDetails() {
        return (
            <section className='card depth-2'>
                <h4>Editing {this.state.brand.name}</h4>

                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <ValueItem label='Name' value={this.state.brand.name} />
                    <ValueItem label='Business Email' value={this.state.brand.businessEmail || 'N/A'} />
                    <ValueItem label='Phone Number' value={this.state.brand.phoneNumber || 'N/A'} />
                    <ValueItem label='Website' value={this.state.brand.website || 'N/A'} />
                </div>

                <Editable>{this.state.brand.description || ''}</Editable>
            </section >
        )
    }
}

export default Brands