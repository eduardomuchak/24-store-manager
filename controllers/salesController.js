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
    const [{ id }] = await Promise.resolve([
      salesServices.validateParamsId(req.params),
    ]);
    await salesServices.checkIfExists(id);
    const sale = await salesServices.getSaleById(id);
    res.status(HTTP_OK_STATUS).json(sale);
  },

};

module.exports = salesController;