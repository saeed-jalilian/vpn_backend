let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const proxy = require('express-http-proxy')

let app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const domain = 'jalilian-saeed.top'
const subdomain = 'jln'

app.get('/bilbilak', function (req, res, next) {
  const {id, uuid, name} = req.query
  if (!id || !uuid) {
    return res.status(500).send('id & uuid is required!')
  }
  return res.redirect(`https://${subdomain}.${domain}/${id}/${uuid}/${name ? `#${name}` : ''}`)
});


app.get('/bilbilak-proxy', function (req, res, next) {
  return proxy(`https://${subdomain}.${domain}`, {
    proxyReqPathResolver: req => {
      const {id, uuid, name} = req.query
      return `${id}/${uuid}/${name ? `#${name}` : ''}`
    }
  })
})


app.post('/get-bilbilak-url', function (req, res) {
  const {url} = req.body
  try {
    const fullCurrentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const parsedCurrentUrl = new URL(fullCurrentUrl)
    const {pathname: pathnameOfGivenUrl} = new URL(url)
    const [id, uuid] = pathnameOfGivenUrl.split('/').filter(el => el.length > 0)
    res.send(`${parsedCurrentUrl.origin.replace('http', 'https')}/bilbilak?id=${id}&uuid=${uuid}`)
  } catch (e) {
    res.status(500).send('error!')
  }
  
})


app.get('/', function (req, res, next) {
  res.send('Hello World')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  {
    console.log('Running on port 8000')
  }
})

module.exports = app;
