import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ribbonMouseActions, ribbonRegisterCanvas, startDrag } from './actions'

import Canvas from './Canvas'

export default connect(
    state => ({ ...state.painter.colorPicker.ribbon }),
    dispatch => ({
        mouseActions: ribbonMouseActions(dispatch),
        startDraggable: (e) => dispatch( startDrag(e) ),
        registerCanvas: (ctx) => dispatch( ribbonRegisterCanvas(ctx) )
    })
)(Canvas)
