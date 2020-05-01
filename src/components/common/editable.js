import React from 'react'

const editableStyle = {
    border: '1px dotted #ffffff',
    padding: '5px'
}

class Editable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            value: this.props.children
        }
    }

    commitChange() {
        this.props.changeHandler(this.props.id, this.state.value)
        this.setState({ editing: false })
    }

    render() {
        if (this.state.editing)
            return (
                <input type='text'
                    onKeyPress={(e) => { if (e.key === 'Enter') this.commitChange() }}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    value={this.state.value} />
            )
        else
            return (
                <span className='editable'
                    style={editableStyle}
                    onClick={() => this.setState({ editing: true })} >
                    {this.state.value}
                </span>
            )
    }
}

export default Editable