import Axios from 'axios'

/* types / namespace */
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const RESTORE_SESSION = 'RESTORE_SESSION'


export function Login(userInfo) {
	return (dispatch, cb = () => {}) => {
		dispatch({
			type: LOGIN_REQUEST,
			payload: {}
		})
		Axios.post('/api/auth', {
			username: userInfo.username,
			password: userInfo.password
		})
		.then( res => {
			if(res.data.token){
				localStorage.setItem('username_STALYN', res.data.user.user)
				localStorage.setItem('token_STALYN', res.data.token)
				dispatch({
					type: LOGIN_SUCCESS,
					payload: {
						username: res.data.user.user,
						token: res.data.token
					}
				})
				return cb()
			} else {
				dispatch({
					type: LOGIN_FAILURE,
					payload: {
						username: userInfo.username,
						err: res.data.err
					}
				})
				return cb()
			}
		})
	}
}

export function restoreSession() {
	return {
		type: RESTORE_SESSION,
		payload: {
			username: localStorage.getItem('username_STALYN'),
			token: localStorage.getItem('token_STALYN')
		}
	}
}
export function Logout() {
	localStorage.removeItem('username_STALYN'),
	localStorage.removeItem('token_STALYN')
	return {
		type: LOGOUT,
		payload: {}
	}
}
