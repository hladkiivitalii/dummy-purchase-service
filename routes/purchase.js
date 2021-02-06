var express = require('express');
var router = express.Router();
const purchaseService = require('../service/purchase.service');
let logger = require('../logger/logger').logger();

router.post('/', async function(req, res, next) {
    try {
        const customer_id= req.body.customer_id;
        const items = req.body.items;
        const res = await purchaseService.addPurchase(customer_id, items);
        logger.debug(JSON.stringify(res));
        res.json(res)
    } catch (e) {
        return e;
    }
});

module.exports = router;
