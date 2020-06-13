import React, { useEffect } from 'react'

const Statistics = () => {
    useEffect(() => {
        document.title = `Statistics | ${process.env.REACT_APP_NAME}`
    })

    return (
        <section className='card depth-2'>
            <h2>Coming Soon</h2>
        </section>
    )
}

export default Statistics