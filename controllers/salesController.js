const salesServices = require('../services/salesServices');
const {
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_NO_CONTENT_STATUS,
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
    await salesServices.checkIfSaleExists(id);
    const sale = await salesServices.getSaleById(id);
    res.status(HTTP_OK_STATUS).json(sale);
  },

  async addSale(req, res) {
    const validSale = await salesServices.validateBody(req.body);

    const validProducts = validSale.map(({ productId }) =>
      salesServices.checkIfProductExists(productId));
    await Promise.all(validProducts);

    const saleId = await salesServices.addSale(validSale);

    const responseJson = {
      id: saleId,
      itemsSold: validSale,
    };

    res.status(HTTP_CREATED_STATUS).json(responseJson);
  },

  async editSale(req, res) {
    const [{ id }] = await Promise.resolve([
      salesServices.validateParamsId(req.params),
    ]);
    const changes = await salesServices.validateBody(req.body);
    await salesServices.checkIfSaleExists(id);

    const validProducts = changes.map(({ productId }) =>
      salesServices.checkIfProductExists(productId));
    await Promise.all(validProducts);
    
    const saleId = await salesServices.editSale(id, changes);

    const responseJson = {
      saleId,
      itemsUpdated: changes,
    };

    res.status(HTTP_OK_STATUS).json(responseJson);
  },

  async deleteSale(req, res) {
    const [{ id }] = await Promise.resolve([
      salesServices.validateParamsId(req.params),
    ]);
    await salesServices.checkIfSaleExists(id);
    await salesServices.deleteSale(id);
    res.sendStatus(HTTP_NO_CONTENT_STATUS);
  },
};

module.exports = salesController;