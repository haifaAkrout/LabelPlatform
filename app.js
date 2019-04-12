var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
var chatRouter=require('./api/chat');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter=require('./api/user');
var emailRouter=require('./api/email');
var pollRouter=require('./api/poll1');
var experience = require('./api/Experience');
var education = require('./api/Education');
var label = require('./api/Label');
var link = require('./api/Link');
var response = require('./api/Response');
var questionnaire = require('./api/Questionnaire');
var responseJudge=require('./api/ResponseJudge');
var projectsRouter=require('./api/Project');
var candidaturesRouter=require('./api/Candidature')
var JudgesRouter=require('./api/JudgeCompte')
var sessionsRouter=require('./api/Session')
var responsescandidat=require('./api/ResponseCandidat')
var app = express();
var db= require('./models/db');
app.use(express.static(__dirname));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',emailRouter);
app.use('/login',userRouter);
app.use('/projects',projectsRouter);
app.use('/Judges',JudgesRouter);
app.use('/Candidatures',candidaturesRouter);
app.use('/sessions',sessionsRouter);
app.use('/experience',experience);
app.use('/education',education);
app.use('/label',label);
app.use('/link',link);
app.use('/response',response);
app.use('/questionnaire',questionnaire);
app.use('/',chatRouter);
app.use('/poll',pollRouter);
app.use('/responsesJudges',responseJudge);
app.use('/responsecandidat',responsescandidat);
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
