import {
	MESSAGE_REQUEST,
	MESSAGE_SUCCESS,
	MESSAGE_FAILURE
} from '../actions/contact.js'


const InitialState = {
	loading: false,
	loaded: true
}


export function reducer(state = InitialState, action) {
	switch(action.type){
		case MESSAGE_REQUEST:
			return {
				...state,
				loading: true,
				loaded: false,
				info: action.payload.info
			}
		case MESSAGE_SUCCESS:
			return {
				...state,
					loaded: true,
					loading: false,
					info: action.payload.info,
					to: action.payload.to
			}
		case MESSAGE_FAILURE:
			return {
				...state,
				loaded: false,
				loading: false,
				err: action.payload.err
			}
		default:
			return state
	}
}
