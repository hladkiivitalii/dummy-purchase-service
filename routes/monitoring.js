var express = require('express');
var router = express.Router();
const custom = require('../monitoring/http-request-timemetric');
const monitoringService = require('../monitoring/default-metric');
/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        custom.startMessure();
        const metrics = await monitoringService.metrics();
        custom.endMessure('/', 200, 'get_metrics');
        res.json(metrics);
    } catch (e) {
        return e;
    }
});

module.exports = router;
