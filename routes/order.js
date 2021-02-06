var express = require('express');
var router = express.Router();
const cache = require('../cache/redis.cache');

let orderRepositor = require('../repository/order.repository');
/* GET users listing. */
router.get('/:id', async function(req, res, next) {
    try {
        const order = await orderRepositor.findOrderById(req.params.id);
        res.json(order);
    } catch (e) {
        return e;
    }
});

router.get('/customer/:id', async function(req, res, next) {
    try {
        const order = await orderRepositor.findCustomerOrders(req.params.id);
        await cache.set(req, order);
        return res.json(order);
    } catch (e) {
        return e;
    }
});

module.exports = router;
