import { connect } from 'react-redux'
import { painterMouseActions, painterRegisterCanvas } from './actions'

import Canvas from './Canvas'

export default connect(
    state => ({ ...state.app.painter }),
    (dispatch, { isDown }) => ({
        mouseActions: painterMouseActions(dispatch),
        registerCanvas: (ctx) => dispatch( painterRegisterCanvas(ctx) )
    })
)(Canvas)
