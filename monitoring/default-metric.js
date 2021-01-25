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
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    buckets: [1, 2, 5, 6, 10]
});


register.registerMetric(counter);
register.registerMetric(timer);


module.exports.metrics = async () => await register.metrics();
module.exports.contentType = () => register.contentType;

const countHttpRequestsMiddleware = function (req, res, next) {
    try {
        counter.inc();
        const start = moment().valueOf();
        res.on('finish', function () {
            try {
                const stop = moment().valueOf();
                const time = stop - start;
                timer.observe(time)
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
