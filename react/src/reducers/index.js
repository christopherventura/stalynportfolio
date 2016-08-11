import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as user }  from  './user.js'
import { reducer as posts } from './posts.js'
import { reducer as contact } from './contact.js'
import { reducer as ReduxForm } from 'redux-form'

const rootReducer = combineReducers({
	user,
	posts,
	contact,
	routing: routerReducer,
	form: ReduxForm
})

export default rootReducer
