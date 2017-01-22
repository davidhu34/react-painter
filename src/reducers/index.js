import { combineReducers } from 'redux'
import { data } from './data'
import { canvas, context } from './canvas'
const App = combineReducers({
    data,
    canvas,
    context
})

export default App
