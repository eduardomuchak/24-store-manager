const connection = require('./connection');

const salesModel = {

  async checkIfExists(saleId) {
    const query = 'SELECT 1 FROM sales_products WHERE sale_id = ?';
    const [[exists]] = await connection.execute(query, [saleId]);
    return !!exists;
  },
  
  async listAllSales() {
    const query = `
      SELECT 
          sp.sale_id AS saleId,
          s.date,
          sp.product_id AS productId,
          sp.quantity
      FROM
          sales_products AS sp
              INNER JOIN
          sales AS s ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id
    `;
    const [sales] = await connection.execute(query);
    return sales;
  },

  async getSaleById(saleId) {
    const query = `
      SELECT 
          s.date, 
          sp.product_id AS productId, 
          sp.quantity
      FROM 
          sales_products AS sp
              INNER JOIN 
          sales AS s ON sp.sale_id = s.id
      WHERE s.id = ?;
    `;
    const [sale] = await connection.execute(query, [saleId]);
    return sale;
  },

};

module.exports = salesModel;