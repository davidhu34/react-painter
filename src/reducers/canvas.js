const initCanvas = {
    mouse: 'up',
    border: '1px solid black'
}



const canvas = ( state = initCanvas, action ) => {
    switch ( action.type ) {
        case 'MOUSE_DOWN':
            return {
                ...state,
                mouse: 'down'
            }
        case 'MOUSE_MOVE':
            return state
        case 'MOUSE_UP':
            return {
                ...state,
                mouse: 'up'
            }
        default:
            return state
    }
}



export default canvas
