var express = require('express');
var router = express.Router();
const custom = require('../monitoring/http-request-timemetric');
const monitoringService = require('../monitoring/default-metric');
/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        custom.startMessure();
        const contentType = monitoringService.contentType;
        const metrics = await monitoringService.metrics();
        custom.endMessure('/', 200, 'get_metrics');

        console.log('sdsdf')
        res.set('Content-Type', contentType);
        res.end(metrics);
    } catch (e) {
        return e;
    }
});

module.exports = router;
