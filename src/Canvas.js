import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { painterMouseActions, registerCanvas } from './actions'

class Canvas extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        const { registerCanvas, context } = this.props
        if ( context == null ) {
            const _canvas = findDOMNode(this)
            _canvas.width = 600
            _canvas.height = 600
            registerCanvas( _canvas.getContext('2d') )
        }
    }
    render () {
        const { mouseActions, style, isDown, tool } = this.props
        const { down, move, up } = mouseActions
        return (
            <canvas onMouseDown={ isDown ? null : down }
                    onMouseMove={ isDown ? move : null }
                    onMouseOut={ isDown ? up : null }
                    onMouseUp={ isDown ? up : null }
                    //onMouseEnter={enter}
                    style={style}/>
        )
    }
}

export default connect(
    state => ({ ...state.painter }),
    dispatch => ({
        mouseActions: painterMouseActions(dispatch),
        registerCanvas: (ctx) => dispatch( registerCanvas(ctx) )
    })
)(Canvas)
