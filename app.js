var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passport=require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const{to}=require('./global_function');

var indexRouter = require('./routes/v1');
// var usersRouter = require('./routes/users');
var cryptoService=require('./services/crypto.service');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./config/config');

app.use(passport.initialize());
app.use(async function(req,res,next){
  if(req && req.headers  && req.headers.authorization){
   [err,req.headers.authorization] =await to(cryptoService.decrypt(req.headers.authorization));
  }
  res.setHeader('Access-Controls-Allow-Origin','*');

  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');

  res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type,Authorization,Content-Type');

  res.setHeader('Access-Control-Allow-Credentials',true);

  next();
});


const models=require('./models');

models.sequelize.authenticate().then(()=>{
  console.log("connected to sql database")
}).catch((err)=>{
  console.log("Unable to connect the database",err.message);
});
models.sequelize.sync({alter:true});


app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
