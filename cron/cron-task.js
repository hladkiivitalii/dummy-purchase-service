const random = require('../util/random');

var CronJob = require('cron').CronJob;
const purchaseService = require('../service/purchase.service');
var job = new CronJob('* * * * * *', async function() {
    const cusotmer_id = random(1, 100);
    const items = [{
            cost: random(1, 1000),
            product_id: random(1, 1000)
        },
        {
            cost: random(1, 1000),
            product_id: random(1, 1000)
        },
        {
            cost: random(1, 1000),
            product_id: random(1, 1000)
        }];

    await purchaseService.addPurchase(cusotmer_id, items);
    console.log('You will see this message every second');
}, null, null, 'America/Los_Angeles');
// job.start();

module.exports.start = () => job;