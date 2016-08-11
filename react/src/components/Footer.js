import React from 'react'
import { Link } from 'react-router'
export default function Footer(){
	return(
		<footer>
			<hr />
			<div class='container footer'>
				<ul class='list-inline pull-left'>
					<li>(c) Copyright 2016. StalynCreative Films, Inc. All Rights Reserved. </li>
				</ul>
				<ul class='list-inline pull-right'>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='login'>Login</Link></li>
				</ul>
			</div>
		</footer>
	)
}
