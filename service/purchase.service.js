const purchaseRepository = require('../repository/purchase.reposotory');
const orderRepository = require('../repository/order.repository');

const addPurchase = async (customer_id, items) => {
    const cost = items.reduce((acc, cur) => {
        return acc + cur.cost
    }, 0);
    const orderItem = {
        cost: cost,
        customer_id: customer_id
    };

    const order = await orderRepository.creatOrder(orderItem);
    console.log(`Order ${JSON.stringify(order)}`);

    const purchaseList = items.map(item => {
        return {
            price: item.cost,
            order_id: order.id,
            product_id: item.product_id
        }
    });

    const purchase = purchaseRepository.addPurchaseList(purchaseList);
    return purchase;
};

module.exports = {
    addPurchase
};