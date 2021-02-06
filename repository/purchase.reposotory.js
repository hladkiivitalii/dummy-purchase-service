const Purchae = require('../model/purchase');

const addPurchaseList = async (purchaseList, t) => {
    return Purchae.bulkCreate(purchaseList, {transaction: t});
};

module.exports = {
    addPurchaseList
};