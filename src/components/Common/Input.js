import React from 'react'

const Input = ({ type, name, label, value, onChange, placeholder, error }) => {
    return (
        <div className='form-group'>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder} />
            <div className='alert alert-danger'>
                {error}
            </div>
        </div>
    )
}

export default Input