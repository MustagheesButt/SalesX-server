import React from 'react'

import './loading.css'

const Loading = ({ type, msg }) => {
    if (type === 'spinner') return <div className='spinner'>Loading...</div>

    return (
        <section className='card depth-2 d-flex' style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p>{ msg || 'Please wait while data is loading...' }</p>
            <div className='wrapper'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='shadow'></div>
                <div className='shadow'></div>
                <div className='shadow'></div>
            </div>
        </section>
    )
}

export default Loading