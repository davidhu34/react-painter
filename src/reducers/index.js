import { combineReducers } from 'redux'
import { data } from './data'
import painter from './painter'
const App = combineReducers({
    data,
    painter
})

export default App
