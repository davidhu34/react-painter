import { combineReducers } from 'redux'
import { data } from './data'
import canvas from './canvas'
const App = combineReducers({
    data,
    canvas
})

export default App
