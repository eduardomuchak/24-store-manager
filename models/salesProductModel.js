const connection = require('./connection');

const salesProductModel = {

  async checkIfProductExists(id) {
    const query = 'SELECT 1 FROM products WHERE id = ?';
    const [[exists]] = await connection.execute(query, [id]);
    return !!exists;
  },

  async addSaleProducts(saleId, productId, quantity) {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.execute(query, [saleId, productId, quantity]);
    return saleId;
  },
  
};

module.exports = salesProductModel;