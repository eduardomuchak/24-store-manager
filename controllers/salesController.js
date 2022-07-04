const salesServices = require('../services/salesServices');
const {
  HTTP_OK_STATUS,
} = require('../helpers/codesHTTP');

const salesController = {

  async listAllSales(_req, res) {
    const sales = await salesServices.listAllSales();
    res.status(HTTP_OK_STATUS).json(sales);
  },

  async getSaleById(req, res) {
    const { id } = req.params;
    const product = await salesServices.getSaleById(id);
    res.status(HTTP_OK_STATUS).json(product);
  },

};

module.exports = salesController;