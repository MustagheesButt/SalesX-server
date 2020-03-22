import React from 'react'

const Home = (props) => {
    return (
        <main id='home'>
            <section className='jumbotron' style={{
                backgroundImage: 'url(assets/images/blake-wisz-tE6th1h6Bfk.jpg)',
                backgroundSize: 'cover',
                minHeight: '600px',
                overflow: 'auto' }}>
                <h3>SalesX</h3>
                <h1>A next-gen Point of Sales system, designed to help you grow your business.</h1>
            </section>
        </main>
    )
}

export default Home