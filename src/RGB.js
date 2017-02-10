import React, { Component } from 'react'
import { connect } from 'react-redux'

const RGB = ({ color }) => {
	if(color) {
		const R = color.red()
		const G = color.green()
		const B = color.blue()
		return <div>
			<label>R: <input type='text' inputMode='numeric' value={R} /></label>
			<label>G: <input type='text' value={G} /></label>
			<label>B: <input type='text' value={B} /></label>
		</div>
	} else return <div/>
	
}
export default connect(
	state => ({color: state.app.colorPicker.color})
)(RGB)