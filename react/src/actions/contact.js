import Axios from 'axios'
export const MESSAGE_REQUEST = 'MESSAGE_REQUEST'
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS'
export const MESSAGE_FAILURE = 'MESSAGE_FAILURE'

const to = 'flickerstudiord@gmail.com'

export function sendMessage(message) {
	return (dispatch, cb) => {
		dispatch({
			type: MESSAGE_REQUEST,
			payload: {
				info: 'Sending message...'
			}
		})
		Axios.post('/api/email', {
			name: message.name,
			email: message.email,
			to: to,
			subject: message.subject,
			body: message.body
		})
		.then( response => {
			if(response.data.err){
				dispatch({
					type: MESSAGE_FAILURE,
					payload: {
						err: response.data.err
					}
				})
			} else {
				dispatch({
					type: MESSAGE_SUCCESS,
					payload: {
						to: to,
						info: `Message sent to ${to}.`
					}
				})
			}
		})
		return cb && cb()
	}
}
