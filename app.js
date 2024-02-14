let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const domain = 'saeed-jalilian.lol'
const subdomain = 'jln'

app.get('/bilbilak', function (req, res, next) {
  const {id, uuid, name} = req.query
  if (!id || !uuid) {
    return res.status(500).send('id & uuid is required!')
  }
  return res.redirect(`https://${subdomain}.${domain}/${id}/${uuid}/${name ? `#${name}` : ''}`)
});

app.get('/',function(req,res,next){
  res.send('Hello World')
})

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

app.listen(5000,() => {{
  console.log('Running on port 5000')
}})

module.exports = app;
