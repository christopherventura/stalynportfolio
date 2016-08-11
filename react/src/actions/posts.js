import Axios from 'axios'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

export let getPosts = (id = '') => {
	return (dispatch, cb = () => {}) => {
		let endpoint = '/api/posts/' + id
		dispatch({
			type: POST_REQUEST,
			payload: {}
		})
		Axios.get(endpoint)
		.then( res => {
			if(res.data){
				dispatch({
					type: POST_SUCCESS,
					payload: res.data
				})
				return cb()
			} else {
				dispatch({
					type: POST_FAILURE,
					payload: res.data.err
				})
			}
		})
	}
}
