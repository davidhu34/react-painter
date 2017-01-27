import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectTool } from './actions'
import Tool from './Tool'

const ToolList = ({ tool, selectTool }) => {
    const selected = tool
    const tools = [ 'pen', 'line', 'square', 'rect', 'circle', 'oval' ]
    return (
        <div>
            {tools.map( t => (
                <Tool key={t}
                    tool={t}
                    selected={( t === selected )}
                    selectTool={() => selectTool(t)}
                />
            ))}
        </div>
    )
}


export default connect(
    state => ({ tool: state.painter.tool }),
    dispatch => ({
        selectTool: (tool) => dispatch( selectTool(tool) )
    })
)(ToolList)
