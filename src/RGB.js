import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeRGBValue } from './actions'
const RGB = ({ color, changeRGBValue }) => {
	if(color) {
		const R = color.red()
		const G = color.green()
		const B = color.blue()
		return <div>
			<label>R: <input type='text'
				defaultValue={R}
				onChange={changeRGBValue('r')} /></label>
			<label>G: <input type='text'
				defaultValue={G}
				onChange={changeRGBValue('g')} /></label>
			<label>B: <input type='text'
				defaultValue={B}
				onChange={changeRGBValue('b')} /></label>
		</div>
	} else return <div/>
	
}
export default connect(
	state => ({color: state.app.colorPicker.color}),
	dispatch => ({
		changeRGBValue: (color) => (e) => {
			console.log(color)
			console.log(e)
			dispatch(changeRGBValue(color,e.target.value))
		}
	})
)(RGB)