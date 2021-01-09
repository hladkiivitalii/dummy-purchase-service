var express = require('express');
var router = express.Router();
let customerRepository = require('../repository/customer');
/* GET users listing. */
router.get('/:id', async function(req, res, next) {
    try {
        const customer = await customerRepository.findCustomerById(req.params.id);
        console.log(`got customer: ${JSON.stringify(customer)}`)
        res.json(customer);
    } catch (e) {
        return e;
    }
});

module.exports = router;
