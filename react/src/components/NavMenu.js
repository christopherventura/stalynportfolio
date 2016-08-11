import { Link } from 'react-router'
import React from 'react'

export default function NavMenu({path}) {
	return (
		<nav class='nav navbar-default'>
			<div class='container-fluid'>
				<div class='container'>
				<div class='navbar-header'>
					<a href='/' class='navbar-brand special'>
						<i class='fa fa-film fa-off'></i>
					</a>
				</div>
				<div class='collapse navbar-collapse'>
					<ul class='nav navbar-nav navbar-left'>
						<li class={ path == '/' ? 'active' : null }><Link to='/'>Home</Link></li>
						<li class={ path == '/contact' ? 'active' : null }><Link to='/contact'><i class='fa fa-off fa-envelope'></i>Contact</Link></li>
					</ul>
					<ul class='nav navbar-nav navbar-right'>
						<li class={ path == '/' ? 'active' : null }><Link to='/'><i class='fa fa-off fa-newspaper-o'></i>Blog</Link></li>
						<li class={ path == '/graphics' ? 'active' : null }><Link to='/graphics'><i class='fa fa-off fa-photo'></i>Graphics</Link></li>
						<li class={ path == '/videos' ? 'active' : null }><Link to='/videos'><i class='fa fa-off fa-film'></i>Videos</Link></li>
						<li class={ path == '/biography' ? 'active' : null }><Link to='/biography'><i class='fa fa-off fa-suitcase'></i>Biography</Link></li>
					</ul>
				</div>
				</div>
			</div>
		</nav>
	)
}
