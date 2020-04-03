import React from 'react'
import { Route } from 'react-router-dom'

import http from '../../services/httpService'

import NewBrandForm from '../../components/forms/newBrandForm'

const apiEndpoint = '/brands'

const Brands = (props) => {
    return (
        <React.Fragment>
            <Route path='/dashboard/brands' exact component={AllBrands} />
            <Route path='/dashboard/brands/new-brand' component={NewBrand} />
        </React.Fragment>
    )
}

class AllBrands extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brands: []
        }
    }

    async populateBrands() {
        try {
            const { data: brands } = await http.get(apiEndpoint)
            this.setState({ brands })
        } catch ({ response }) {
            console.error(response.data)
        }
    }

    async componentDidMount() {
        this.populateBrands()
    }

    render() {
        const brandsList = this.state.brands.map(brand => {
            return (
                <tr key={brand._id}>
                    <td>{brand.name}</td><td>{brand.businessEmail || 'N/A'}</td><td>{brand.phoneNumber}</td><td>{brand.website || 'N/A'}</td><td>{brand.description || 'N/A'}</td>
                </tr>
            )
        })

        return (
            <section className='card depth-3'>
                <h2>Your Brands</h2>
                <div>
                    <p>Click on a brand to edit its details.</p>
                    <table style={{ width: '100%' }}>
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
                                <th>Name</th>
                                <th>Business Email</th>
                                <th>Phone Number</th>
                                <th>Website</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brandsList}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

const NewBrand = (props) => {
    return (
        <section className='card depth-3'>
            <h2>Create a New Brand</h2>
            <div>
                <NewBrandForm />
            </div>
        </section>
    )
}

export default Brands