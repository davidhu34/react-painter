import { combineReducers } from 'redux'
import { data } from './data'
import painter from './painter'
import colorPicker from './colorPicker'

const App = combineReducers({
    data,
    painter,
    colorPicker
})

export default App
