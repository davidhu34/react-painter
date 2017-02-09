import { combineReducers } from 'redux'
import { data } from './data'
import app from './app'

const App = combineReducers({
    data,
    app
})

export default App
