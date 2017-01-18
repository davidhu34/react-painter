import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { mouseActions } from './actions'

class Canvas extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        this.canvas = findDOMNode(this)
        this.context = this.canvas.getContext('2d')
    }
    render () {
        const ctx = this.context
        const { mouseActions, border } = this.props
        const { down, move, up } = mouseActions(ctx)
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
    state => ({ border: state.canvas.border }),
    dispatch => ({
        mouseActions: (ctx) => ({
            down: (e) => dispatch( mouseActions.down(ctx, e) ),
            move: (e) => dispatch( mouseActions.move(ctx, e) ),
            up: (e) => dispatch( mouseActions.up(ctx, e) ),
        })
    })
)(Canvas)
