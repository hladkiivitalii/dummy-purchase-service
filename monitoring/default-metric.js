const client = require('prom-client');
const register = new client.Registry();

const moment = require('moment');

register.setDefaultLabels({
    app: 'example-nodejs-app'
});
// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

const counter = new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests'
});

const timer = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
})


register.registerMetric(counter);
register.registerMetric(timer);


module.exports.metrics = async () => await register.metrics();
module.exports.contentType = () => register.contentType;

const countHttpRequestsMiddleware = function (req, res, next) {
    try {
        counter.inc();
        const end = timer.startTimer();
        res.on('finish', function () {
            try {
                const route = '/';
                end({ route, code: res.statusCode, method: req.method })
            } catch (e) {
                console.log(e)
            }
        });
        next();
    } catch (e) {
        console.log(e)
    }
};

module.exports.countHttpRequestsMiddleware = countHttpRequestsMiddleware;
