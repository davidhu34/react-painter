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
            registerCanvas( _canvas.getContext('2d') )
        }
    }
    render () {
        const { mouseActions, border } = this.props
        const { down, move, up } = mouseActions()
        console.log(up)
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
        mouseActions: () => ({
            down: (e) => dispatch( mouseActions.down(e) ),
            move: (e) => dispatch( mouseActions.move(e) ),
            up: (e) => dispatch( mouseActions.up(e) ),
        }),
        registerCanvas: (ctx) => dispatch( registerCanvas(ctx) )
    })
)(Canvas)
