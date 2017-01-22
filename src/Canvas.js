import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { mouseActions, registerCanvas } from './actions'

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
        const { mouseActions, border, isDrawing, tool } = this.props
        let { down, move, up } = mouseActions(tool)
        if ( !isDrawing ) {
            move = null
            up = null
        }
        return (
            <canvas onMouseDown={down}
                    onMouseMove={move}
                    onMouseOut={up}
                    onMouseUp={up}
                    style={{
                        border: border
                    }}/>
        )
    }
}

export default connect(
    state => ({ ...state.canvas }),
    dispatch => ({
        mouseActions: (tool) => ({
            down: (e) => dispatch( mouseActions.down(e, tool) ),
            move: (e) => dispatch( mouseActions.move(e, tool) ),
            up: (e) => dispatch( mouseActions.up(e, tool) ),
        }),
        registerCanvas: (ctx) => dispatch( registerCanvas(ctx) )
    })
)(Canvas)
