import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { sendMessage } from '../actions/contact.js'
import Helmet from 'react-helmet'

function mapStateToProps(state, props){
	return {
		contact: state.contact
	}
}

@connect(mapStateToProps)
@reduxForm({
	form: 'contact-email',
	fields: ['name', 'email', 'subject', 'body']
})
export default class extends Component {
	onSendMessage(ev) {
		ev.preventDefault()
		const msg = {
			name: this.props.fields.name.value,
			email: this.props.fields.email.value,
			subject: this.props.fields.subject.value,
			body: this.props.fields.body.value
		}
		const action = sendMessage(msg)
		action(this.props.dispatch)
	}
	render() {
		const { name, email, subject, body } = this.props.fields
		const { err, info } = this.props.contact
		return (
			<div class='container'>
				<Helmet title='Contact'/>
				<div class='page-header'>
					<h3>Contact</h3>
				</div>
				<div>
					{
						( err || info ) &&
						<div class={`alert alert-${err ? 'danger' : 'success'}`} role='alert'>
							<p>{err || info}</p>
						</div>
					}
					<form role='form' class='form-signin' onSubmit={ this.onSendMessage.bind(this) }>
						<div class='form-group'>
							<label for={name} class='col-sm-offset-1 col-sm-2'>Name:</label>
							<div class='col-sm-7'>
								<input type='text' id={name} placeholder='Your name...' class='form-control' required {...name} autofocus />
							</div>
						</div>
						<div class='form-group'>
							<label for={email} class='col-sm-offset-1 col-sm-2'>Email:</label>
							<div class='col-sm-7'>
								<input type='email' id={email} placeholder='Your email...' class='form-control' required {...email}/>
							</div>
						</div>
						<div class='form-group'>
							<label for={subject} class='col-sm-offset-1 col-sm-2'>Subject:</label>
							<div class='col-sm-7'>
								<input type='text' id={subject} placeholder='Subject...' class='form-control' required {...subject}/>
							</div>
						</div>
						<div class='form-group'>
							<label for={body} class='col-sm-offset-1 col-sm-2'>body:</label>
							<div class='col-sm-7'>
								<textarea {...body} id={body} rows='10' placeholder='Message...' class='form-control' required value={body.value || ''}/>
							</div>
						</div>
						<div class='form-group'>
							<div class='col-sm-offset-3 col-sm-2'>
								<button type='submit' class='btn btn-block btn-info'>
									<i class='fa fa-envelope fa-off'></i>
									Send
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}


