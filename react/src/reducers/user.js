import _ from 'lodash'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	RESTORE_SESSION
} from '../actions/user.js'

const initialState = {
	loggedIn: false,
	loaded: false,
	loading: false
}

export function reducer(state = initialState, action){
	switch(action.type){
		case RESTORE_SESSION:
			return {...state,
				username: action.payload.username || '',
				token: action.payload.token || '',
				loggedIn: action.payload.token ? true : false
			}
		case LOGIN_REQUEST:
			return {...state,
				loaded: false,
				loading: true
			}
		case LOGIN_SUCCESS:
			return {...state,
				username: action.payload.username,
				token: action.payload.token,
				loggedIn: true,
				loaded: true,
				loading: false,
				err: ''
			}
		case LOGIN_FAILURE:
			return {...state,
				username: action.payload.username,
				err: action.payload.err,
				loggedIn: false,
				loaded: false,
				loading: false,
				token: ''
			}
		case LOGOUT:
			return {...state, ...initialState,
				err: '',
				token: '',
				loaded: false,
				loading: false
			}
		default:
			return state
	}
}
