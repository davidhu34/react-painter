import React, { Component, PropTypes } from 'react'

const Tool = ({
    selected, tool,
    selectTool
}) => {
    const renderTool = selected?
        (<b>{tool}</b>) : (tool)
    console.log(renderTool)
    return (
        <div onClick={selectTool}>
            {renderTool}
        </div>
    )
}

Tool.propTypes = {
    selected: PropTypes.bool.isRequired,
    tool: PropTypes.string.isRequired,
    selectTool: PropTypes.func.isRequired
}
export default Tool
