const connection = require('./connection');

const salesProductModel = {

  async checkIfProductExists(id) {
    const query = 'SELECT 1 FROM products WHERE id = ?';
    const [[exists]] = await connection.execute(query, [id]);
    return Boolean(exists);
  },

  async addSaleProducts(saleId, productId, quantity) {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.execute(query, [saleId, productId, quantity]);
    return saleId;
  },

  async editSaleProducts(quantity, saleId, productId) {
    const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
    await connection.execute(query, [quantity, saleId, productId]);
    return saleId;
  },  
};

module.exports = salesProductModel;