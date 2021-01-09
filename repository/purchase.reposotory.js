const Purchae = require('../model/purchase');

const addPurchaseList = async (purchaseList) => {
    return Purchae.bulkCreate(purchaseList);
};

module.exports = {
    addPurchaseList
};