import React from 'react'

const About = (props) => {
    return (
        <main className='grid-container depth-1' style={{ backgroundImage: 'url(assets/images/tobias-a-muller-fusq9KwkSF4.jpg)', backgroundSize: 'cover' }}>
            <section className='card depth-2' style={{ gridColumn: 'span 12', margin: '10% auto', width: '50%' }}>
                <h1>About SalesX</h1>

                <p>Let's start with a story. It was a rainy night 120000 years ago, on this exact day...</p>
            </section>
        </main>
    )
}

export default About