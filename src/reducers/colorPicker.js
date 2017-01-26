import { combineReducers } from 'redux'
import colorRibbon from './colorRibbon'
import colorPalette from './colorPalette'

export default combineReducers({
    ribbon: colorRibbon,
    palette: colorPalette
})
