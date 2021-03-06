import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeRGBValue, changeFocus } from './actions'

class RGB extends Component {
	constructor(props) {
		super(props)
		this.to = null;
	}
	handleFocus () {

	}
	handleBlur () {

	}
	componentDidUpdate (props) {
		console.log(this.to)
		//props.changeFocus(this.to)
	}
	render () {
 	const { color, focus, changeRGBValue, changeFocus } = this.props
	if(color) {
		console.log('fff')
		const colors = {
			R: color.red(),
			G: color.green(),
			B: color.blue()
		}
		const inputProps = {
			type: 'text',
			//onBlur: changeFocus(null)
		}
		const inputs = ['R','G','B'].map( name => {
				return<input type='text'
					value={colors[name]}
					placeholder={name}
				    ref={ ref => { this[name] = ref } }
					name={name}
					onChange={changeRGBValue(name)} ></input>
		})
		return <div>{inputs}
		</div>
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
			dispatch(changeRGBValue(color,e.target.value))
		},
		changeFocus: (to) => dispatch(changeFocus(to))
	})
)(RGB)
