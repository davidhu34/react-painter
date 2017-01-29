import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ribbonMouseActions, ribbonRegisterCanvas, startDrag } from './actions'

import Canvas from './Canvas'

const Ribbon = props => {

    const { width, height, startDraggable } = props
    return (
        <div width={width} height={height}>
            <div onMouseDown={startDraggable}
            style={{
                width: 50, height: 20,
                color: 'blue',
                backgroundColor: 'blue',
                position: 'relative',
                top: 20
            }}> bar </div>
            <Canvas {...props} />
        </div>
    )
}



export default connect(
    state => ({ ...state.painter.colorPicker.ribbon }),
    dispatch => ({
        mouseActions: ribbonMouseActions(dispatch),
        startDraggable: (e) => dispatch( startDrag(e) ),
        registerCanvas: (ctx) => dispatch( ribbonRegisterCanvas(ctx) )
    })
)(Ribbon)
