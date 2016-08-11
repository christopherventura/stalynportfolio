import {
	POST_REQUEST,
	POST_SUCCESS,
	POST_FAILURE
} from '../actions/posts.js'


const initialState = {
	loaded: false,
	loading: false,
}

export function reducer(state = initialState, action) {
	switch(action.type){
		case POST_REQUEST:
			return {...state,
				loaded: false,
				loading: true,
				err: ''
			}
		case POST_SUCCESS:
			return {...state,
				loaded: true,
				loading: false,
				posts: action.payload,
				err: ''
			}
		case POST_FAILURE:
			return {...state,
				loaded: false,
				loading: false,
				err: action.payload
			}
		default:
			return state
	}
}
