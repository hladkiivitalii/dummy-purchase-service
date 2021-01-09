var express = require('express');
var router = express.Router();
const purchaseService = require('../service/purchase.service');

router.post('/', async function(req, res, next) {
    try {
        const customer_id= req.params.customer_id;
        const items = req.params.items;
        await purchaseService.addPurchase(customer_id, items);
    } catch (e) {
        return e;
    }
});

module.exports = router;
