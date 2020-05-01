import React from 'react'

const valueItemStyles = {
    display: 'inline-block'
}

const ValueItem = (props) => {
    return (
        <div style={valueItemStyles}>
            <h6>{props.label}</h6>
            <h4>{props.value}</h4>
        </div>
    )
}

export default ValueItem