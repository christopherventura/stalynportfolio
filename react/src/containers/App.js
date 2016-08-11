import React, { Component } from 'react'
import Helmet from 'react-helmet'
import {
	connect
} from 'react-redux'
import { NavMenu, Footer } from '../components'
@connect()
export default class extends Component{
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<Helmet titleTemplate='%s | StalynCreative.com'/>
				<NavMenu path={this.props.location.pathname}/>
			<div>
				{ this.props.children }
			</div>
				<Footer/>
			</div>
		)
	}
}
