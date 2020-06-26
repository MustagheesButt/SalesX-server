import React from 'react'

import authService from '../../services/authService'

import Navbar from '../navbar/navbar'

const Main = ({ children }) => {
    return (
        <>
            <header>
                <Navbar user={authService.getCurrentUser()} />
            </header>
            {children}
            <footer>
                <div>
                    &copy; Copyright <a href='https://nezuco.com' target='_blank' rel='noopener noreferrer'>Nezuco</a>, 2020. All rights reserved.
                        </div>
            </footer>
        </>
    )
}

export default Main