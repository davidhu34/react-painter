export const data = ( state = 1, action ) => {
    switch ( action.type ) {
        case 'ADD':
            state = state+1
            return state
        default:
            return state
    }
}
