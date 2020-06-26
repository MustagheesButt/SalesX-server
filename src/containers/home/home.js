import React, { useEffect } from 'react'

import Main from '../../components/templates/main'
import XButton from '../../components/common/xui/xbutton'
import './home.css'

const Home = () => {
    useEffect(() => {
        document.title = `Home | ${process.env.REACT_APP_NAME}`
    })

    return (
        <Main>
            <main id='home'>
                <section className='jumbotron'>
                    <div className='d-flex' style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '70%',
                        padding: '0 80px'
                    }}>
                        <h1 className='display-3'>SalesX</h1>
                        <h2>A next-gen Sales & Inventory system, designed to help your business grow.</h2>
                    </div>

                    <div className='d-flex' style={{
                        justifyContent: 'center',
                        padding: '0 80px'
                    }}>
                        <XButton type='ghost'>Download Client</XButton>
                        <XButton type='ghost'>Learn More</XButton>
                    </div>
                </section>
            </main>
        </Main>
    )
}

export default Home