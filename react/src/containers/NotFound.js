import React, { Component } from 'react'
import Helmet from 'react-helmet'
import {
	connect
} from 'react-redux'

import { Link } from 'react-router'

@connect()
export default class extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div class='text-center solo-page'>
				<Helmet title='404 - Not Found | StalynCreative.com'/>
					<h1>Page Not Found</h1>
					<p>Oops. Error 404 - This page not found.</p>
					<Link to='/'>
						<strong>Go Home</strong>
					</Link>
			</div>
		)
	}
}
