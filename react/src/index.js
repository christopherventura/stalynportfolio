import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import inyectTapEventPlugin from 'react-tap-event-plugin'
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router'
import {
	syncHistoryWithStore,
	routerMiddleware
} from 'react-router-redux'
import {
	App,
	Home,
	Login,
	Contact,
	NotFound
} from './containers'
import reducers from './reducers'


const store = createStore(
	reducers,
	applyMiddleware(
		routerMiddleware(browserHistory),
		thunkMiddleware,
		promiseMiddleware
	)
)

const history = syncHistoryWithStore(browserHistory, store)

inyectTapEventPlugin()

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={ App }>
				<IndexRoute component={ Home }/>
				<Route path='login' component={ Login } />
				<Route path='contact' component={ Contact } />
			</Route>
			<Route path='*' component={ NotFound }/>
		</Router>
	</Provider>
	, document.getElementById('app'))
