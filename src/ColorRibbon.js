import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ribbonMouseActions, ribbonRegisterCanvas } from './actions'

import Canvas from './Canvas'

const Ribbon = props => {

    const { width, height } = props
    console.log(document)
    return (
        <div width={width} height={height}>
            <div style={{
                width: 50, height: 20,
                color: 'blue',
                backgroundColor: 'blue',
                position: 'absolute'
            }}> bar </div>
            <Canvas {...props} />
        </div>
    )
}



export default connect(
    state => ({ ...state.painter.colorPicker.ribbon }),
    dispatch => ({
        mouseActions: ribbonMouseActions(dispatch),
        registerCanvas: (ctx) => dispatch( ribbonRegisterCanvas(ctx) )
    })
)(Ribbon)
