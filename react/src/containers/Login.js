import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {
	restoreSession,
	Login,
	Logout
} from '../actions/user.js'
import {
	goBack,
	go,
	push
} from 'react-router-redux'
let mapStateToProps = (state, props) => ({
	user: state.user
})

/*
let mapDispatchToProps = (dispatch, props) => ({
	actions: {
		changeUsername: bindActionCreators(changeUsername, dispatch),
		changePassword: bindActionCreators(changePassword, dispatch),
		Login: bindActionCreators(Login, dispatch),
		Logout: bindActionCreators(Logout, dispatch)
	}
})*/

@connect(mapStateToProps)
@reduxForm({
	form: 'login',
	fields: ['username', 'password']
})
export default class extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		const action = restoreSession()
		this.props.dispatch(action)
	}
	handleLogin(ev) {
		ev.preventDefault()
		console.log(this.props.fields)
		const action = Login({
			username: this.props.fields.username.value,
			password: this.props.fields.password.value
		})
		action(this.props.dispatch)
	}
	componentWillReceiveProps(nextProps) {
		/*if(nextProps.user.loggedIn){
			this.props.dispatch(push('/'))
		}*/
	}
	handleLogout(ev) {
		ev.preventDefault()
		if(this.props.user.loggedIn){
			const action = Logout()
			this.props.dispatch(action)
		}
	}
	render() {
		const { username, password  } = this.props.fields
		const { user } = this.props
		return (
			<div class='container'>
			<Helmet title='Login'/>
			<div class='page-header'>
				<h3>Log In</h3>
			</div>
			{
				user.loggedIn &&
				(
					<div>
						<p>Logged in as: <strong>{user.username}</strong></p>
					<br />
					<button class='btn btn-primary' onClick={ this.handleLogout.bind(this) }><i class='fa fa-off fa-user-times'></i>Logout</button>
					</div>
				)
			}
			{
				!user.loggedIn &&
				(
				<div>
					{ user.err &&
						(
							<div class='alert alert-danger' role='alert'>
							<p>{user.err}</p>
							</div>
						)
					}
					<form class='form-signin' role='form' onSubmit={ this.handleLogin.bind(this) } >
						<div class='form-group'>
							<label for={username} class='form-label col-sm-offset-1 col-sm-2'>Username: </label>
							<div class='col-sm-7'>
							<input class='form-control' type='text' placeholder='Username'required autofocus id={username} {...username}/>
							</div>
						</div>
						<div class='form-group'>
							<label for={password} class='form-label col-sm-offset-1 col-sm-2'>Password: </label>
							<div class='col-sm-7'>
							<input class='form-control' id={password} type='password' placeholder='Password' required {...password}/>
							</div>
						</div>
						<div class='form-group'>
						<div class='col-sm-offset-3 col-sm-3'>
						<button type='submit' class='btn btn-primary btn-block'>
						<i class='fa fa-user fa-off'></i>Login</button>
						</div>
						</div>
					</form>
				</div>
				)
			}
			</div>
		);
	}
}
