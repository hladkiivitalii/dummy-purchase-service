var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let logger = require('./logger/logger').logger();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const customerRouter = require('./routes/customer');
const purchaseRouter = require('./routes/purchase');
const orderRouter = require('./routes/order');
const defaultMetric = require('./routes/monitoring');

const cache = require('./cache/redis.cache');

var app = express();
const http_logger = (req, res, next) => {
    logger.trace(req.url);
    next()
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(http_logger)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const metric = require('./monitoring/default-metric');
app.use(metric.countHttpRequestsMiddleware);

const cache_wrapper = (route) =>  async (req, res, next) => {
      // const from_cache = await cache.get(req);
      // if (from_cache) {
      //   return res.json(from_cache);
      // }
      // else
        return route(req, res, next)
};

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer', customerRouter);
app.use('/purchase', purchaseRouter);
app.use('/order', cache_wrapper(orderRouter));
app.use('/metrics', defaultMetric);
app.use((req, res, next) => {
  next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development.env
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development.env' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
