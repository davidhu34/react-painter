import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Canvas extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        const { registerCanvas, context, width, height } = this.props
        if ( context == null ) {
            const _canvas = findDOMNode(this)
            _canvas.width = width
            _canvas.height = height
            registerCanvas( _canvas.getContext('2d') )
        }
    }
    render () {
        const { mouseActions, style, isDown } = this.props
        return (
            <canvas {...mouseActions(isDown)}
                    style={style}/>
        )
    }
}

export default Canvas
