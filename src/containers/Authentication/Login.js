import React from 'react'

import './Authentication.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {

        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    submitHandler(e) {
        e.preventDefault()

        this.props.history.replace('/dashboard')
    }

    render() {
        return (
            <main id='auth' className='flex-container depth-1'>
                <div style={{ margin: 'auto' }}>
                    <h1>Login to your <span style={{ color: 'crimson' }}>SalesX</span> account.</h1>
                </div>

                <section className='card depth-2' style={{ height: '300px' }}>
                    <div>
                        <form>
                            <div>
                                <label>Email</label>
                                <input type='email' name='email' placeholder='Your email address' />
                            </div>

                            <div>
                                <label>Password</label>
                                <input type='password' name='password' placeholder='Your password' />
                            </div>

                            <button type='submit' onClick={this.submitHandler}>Login</button>
                        </form>
                    </div>
                </section>
            </main>
        )
    }
}

export default Login