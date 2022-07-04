const salesServices = require('../services/salesServices');
const {
  HTTP_OK_STATUS,
} = require('../helpers/codesHTTP');

const salesController = {

  async listAllSales(_req, res) {
    const sales = await salesServices.listAllSales();
    res.status(HTTP_OK_STATUS).json(sales);
  },
};

module.exports = salesController;