const Customer = require('../model/customer');

async function findCustomerById (id) {
    console.log('try to find customer')
    const customer = await Customer.findOne({where: {customer_id: id}})
    console.log(`Customer: ${JSON.stringify(customer)}`)
    return customer;
};

module.exports = {
    findCustomerById
};