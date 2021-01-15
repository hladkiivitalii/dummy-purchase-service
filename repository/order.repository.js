const Order = require('../model/order');
const Purchase = require('../model/purchase');
const creatOrder = async (order) => {
    return Order.create(order);
};

const findOrderById = async (orderId) => {
    return Order.findOne(
        {
        where: {id: orderId}
    })
};

const findCustomerOrders = async (customerId, limit = null) => {
    let params = {
        customer_id: customerId
    };
     if (limit) params.limit = limit;

     return Order.findAndCountAll({where: params})
};

module.exports = {
    creatOrder,
    findOrderById,
    findCustomerOrders
};