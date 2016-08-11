const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const compression = require('compression')
const session = require('express-session')
const validator = require('express-validator')
const flash = require('express-flash')
const mongoStore = require('connect-mongo')(session)


let app = express()
mongoose.connect(config.globals.MONGODB_URL, (err) => {
	if(err){
		console.log(err)
	} else {
		console.log('Connected to MongoDB.')
	}
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(compression())
app.use(session({
	secret: config.globals.APP_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new mongoStore({
		url: config.globals.MONGODB_URL,
		autoReconnect: true
	})
}))
app.use(flash())
app.use(validator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**********************************************************/

const blogController = require('./controllers/blog')
const bioController = require('./controllers/bio')
const designsController = require('./controllers/designs')
const videosController = require('./controllers/videos')
const categoriesController = require('./controllers/categories')
const loginController = require('./controllers/login')
const uploadController = require('./controllers/upload')
const mailController = require('./controllers/email')
const ApiRouter = new express.Router()

ApiRouter.get('/', (req, res, next) => {
	res.json({
		title: 'Stalyn Creative Films',
		description: 'Portfolio Website',
		link: 'http://stalynfilms.com/'
	})
})


/*
 * Route: /posts
 */
ApiRouter.get('/posts', blogController.getPosts)
ApiRouter.post('/posts', blogController.postSinglePost)
ApiRouter.get('/posts/:slug', blogController.getSinglePost)
ApiRouter.get('/posts/category/:category', blogController.getCategory)
ApiRouter.get('/posts/tag/:tag', blogController.getTag)
ApiRouter.get('/posts/author/:author', blogController.getAuthor)
ApiRouter.post('/posts/remove', blogController.removeSinglePost)

/*
 * Route: /bio
 */

ApiRouter.get('/bio', bioController.getBio)
ApiRouter.post('/bio', bioController.postBio)

/*
 * Route: /designs
 */

ApiRouter.get('/designs', designsController.getDesigns)
ApiRouter.post('/designs', designsController.postSingleDesign)
ApiRouter.get('/designs/:slug', designsController.getSingleDesign)
ApiRouter.get('/designs/category/:category', designsController.getCategory)
ApiRouter.get('/designs/tag/:tag', designsController.getTag)
ApiRouter.get('/designs/author/:author', designsController.getAuthor)


/*
 * Route: /videos
 */
ApiRouter.get('/videos', videosController.getVideos)
ApiRouter.post('/videos', videosController.postSingleVideo)
ApiRouter.get('/videos/:slug', videosController.getSingleVideo)
ApiRouter.get('/videos/category/:category', videosController.getCategory)
ApiRouter.get('/videos/tag/:tag', videosController.getTag)
ApiRouter.get('/videos/author/:author', videosController.getAuthor)



/*
 * Route: /category
 */

ApiRouter.get('/category', categoriesController.getCategories)
ApiRouter.get('/category/:slug', categoriesController.getSingleCategory)
ApiRouter.get('/category/type/:type', categoriesController.getType)
ApiRouter.post('/category', categoriesController.postSingleCategory)
ApiRouter.post('/category/remove', categoriesController.deleteSingleCategory)

/*
*	Route: /upload
*/

ApiRouter.post('/upload', uploadController.postUpload )


/*
 * Route: /auth
 */


 /*
  * Route: /admin
  */

ApiRouter.post('/auth', loginController.postLogin )



ApiRouter.post('/email', mailController.postEmail )





app.use('/api', ApiRouter)

app.get('*', (req, res, next) => {
	return res.sendFile(`${__dirname}/react/index.html`)
})
/**********************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.json({
		err: err.message
	})
})
app.listen(80, function (err) {
	if (err) {
	  return console.error(err)
	}
	console.log('Listening at port 80')
})
