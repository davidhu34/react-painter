import { connect } from 'react-redux'
import { ribbonMouseActions, ribbonRegisterCanvas } from './actions'

import Canvas from './Canvas'

export default connect(
    state => ({ ...state.colorPicker.ribbon }),
    dispatch => ({
        mouseActions: ribbonMouseActions(dispatch),
        registerCanvas: (ctx) => dispatch( ribbonRegisterCanvas(ctx) )
    })
)(Canvas)
