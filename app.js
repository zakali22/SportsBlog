var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const moment = require('moment');
const passport = require('passport');

var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');
var categoriesRouter = require('./routes/categories');
var manageRouter = require('./routes/manage');
const register = require('./routes/register');
const login = require('./routes/login');


//Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/sportsblog', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Database connected");
});

var app = express();

// Express Sessions
app.use(session({
	secret: 'secret',
	resave: true,
	saveUnitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Express Messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
	res.locals.messages = require('express-messages')(req, res);
	res.locals.user = req.user || null;
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		const namespace = param.split('.')
		, root  = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

app.use('/register', register);
app.use('/login', login);
app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/manage', manageRouter);
app.use('/categories', categoriesRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
