const connection = require('./connection');

const productModel = {

  async checkIfExists(id) {
    const query = 'SELECT 1 FROM products WHERE id = ?';
    const [[exists]] = await connection.execute(query, [id]);
    return !!exists;
  },

  async listAllProducts() {
    const query = 'SELECT * FROM products';
    const products = await connection.execute(query);
    return products[0];
  },

  async getProductById(productId) {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [[product]] = await connection.execute(query, [productId]);
    return product;
  },

  async addProduct(name) {
    const query = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [name]);
    return {
      id: insertId,
      name,
    };
  },

  async editProduct(id, changes) {
    const query = 'UPDATE products SET name = ? WHERE id = ?';
    const product = await connection.execute(query, [changes, id]);
    return product;
  },

  async deleteProduct(id) {
    const query = 'DELETE FROM products WHERE id = ?';
    const product = await connection.execute(query, [id]);
    return product;
  },

  async searchProducts(queryRequest) {
    const query = 'SELECT * FROM products WHERE name LIKE ?';
    const [products] = await connection.execute(query, [`%${queryRequest}%`]);
    return products;
  },
};

module.exports = productModel;
