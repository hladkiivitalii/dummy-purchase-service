const client = require('prom-client');
// Create a Registry which registers the metrics
const register = new client.Registry();
// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'example-nodejs-app'
});
// Enable the collection of default metrics
client.collectDefaultMetrics({ register });
// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});
// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds);


const startMessure = httpRequestDurationMicroseconds.startTimer();

// End timer and add labels
const endMessure = (route, statusCode, method) => startMessure({ route, code: statusCode, method: method });

module.exports = {
    startMessure,
    endMessure
};