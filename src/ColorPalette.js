import { connect } from 'react-redux'
import { paletteMouseActions, paletteRegisterCanvas } from './actions'

import Canvas from './Canvas'

export default connect(
    state => ({ ...state.colorPicker.palette }),
    dispatch => ({
        mouseActions: paletteMouseActions(dispatch),
        registerCanvas: (ctx) => dispatch( paletteRegisterCanvas(ctx) )
    })
)(Canvas)
