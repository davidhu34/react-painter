import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeRGBValue, changeFocus } from './actions'

class RGBinput extends Component {
	handleFocus () {

	}
	handleBlur () {

	}
	componentDidMount () {

	}
	render () {
 	const { name, color, focus, changeRGBValue, changeFocus } = this.props
	if(color) {
		const colors = {
			R: color.red(),
			G: color.green(),
			B: color.blue()
		}
		const inputProps = {
			type: 'text',
			//onBlur: changeFocus(null)
		}
		return (focus === name)?
				<label>{name} <input type='text'
					defaultValue={colors[name]}
					name={name}
					onChange={changeRGBValue(name)} /></label>
			:	<label>{name} <input type='text'
					value={colors[name]}
					onFocus={changeFocus(name)}
					name={name} /></label>

	} else return <div/>
}}
export default connect(
	state => ({
		color: state.app.colorPicker.color,
	}),
	dispatch => ({
		changeRGBValue: (color) => (e) => {
			console.log(color)
			console.log(e)
			console.log(e.target.inputText = 'sadg')
			dispatch(changeRGBValue(color,e.target.value))
		},
		changeFocus: (to) => dispatch(changeFocus(to))
	})
)(RGBinput)
