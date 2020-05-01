import React from 'react'

import './home.css'

const Home = (props) => {
    return (
        <main id='home'>
            <section className='jumbotron' style={{
                height: '600px',
                overflow: 'auto'
            }}>
                <div className='d-flex' style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '70%',
                    padding: '0 80px'
                }}>
                    <h1 className='display-3'>SalesX</h1>
                    <h2>A next-gen Sales & Inventory system, designed to help your business grow.</h2>
                </div>
            </section>
        </main>
    )
}

export default Home