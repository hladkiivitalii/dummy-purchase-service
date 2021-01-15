var express = require('express');
var router = express.Router();
let orderRepositor = require('../repository/order.repository');
/* GET users listing. */
router.get('/:id', async function(req, res, next) {
    try {
        const order = await orderRepositor.findOrderById(req.params.id);
        console.log(`got customer: ${JSON.stringify(order)}`);
        res.json(order);
    } catch (e) {
        return e;
    }
});

router.get('/customer/:id', async function(req, res, next) {
    try {
        const order = await orderRepositor.findCustomerOrders(req.params.id);
        console.log(`got customer: ${JSON.stringify(order)}`);
        res.json(order);
    } catch (e) {
        return e;
    }
});
module.exports = router;
