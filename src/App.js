import React, { Component } from 'react';
import { connect } from 'react-redux'

import Painter from './Painter'
import ToolList from './ToolList'
import { Add } from './actions'


const App = ({ data, Add }) => (
    <div>
        <div>{data}</div>
        <div onClick={() => Add()}>
            add
        </div>
        <Painter />
        <ToolList />
    </div>
)


export default connect(
    state => ({ data: state.data }),
    dispatch => ({
        Add: () => dispatch( Add() )
    })
)(App)
