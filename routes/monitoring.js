var express = require('express');
var router = express.Router();
const monitoringService = require('../monitoring/default-metric');
/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        const contentType = monitoringService.contentType;
        const metrics = await monitoringService.metrics();
        res.set('Content-Type', contentType);
        res.end(metrics);
    } catch (e) {
        return e;
    }
});

module.exports = router;
