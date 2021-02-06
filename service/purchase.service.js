const purchaseRepository = require('../repository/purchase.reposotory');
const orderRepository = require('../repository/order.repository');
const sequelize = require('../db/db');

const addPurchase = async (customer_id, items) => {
    const cost = items.reduce((acc, cur) => {
        return acc + cur.cost
    }, 0);
    const orderItem = {
        cost: cost,
        customer_id: customer_id
    };

    let purchase;
    const result = await sequelize.transaction(async (t) => {
        const order = await orderRepository.creatOrder(orderItem, t);
        console.log(`Order ${JSON.stringify(order)}`);

        const purchaseList = items.map(item => {
            return {
                price: item.cost,
                order_id: order.id,
                product_id: item.product_id
            }
        });

        purchase = await purchaseRepository.addPurchaseList(purchaseList, t);
    });

    return result;
};

module.exports = {
    addPurchase
};