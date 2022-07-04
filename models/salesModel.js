const connection = require('./connection');

const salesModel = {
  
  async listAllSales() {
    const query = `
      SELECT 
          sp.sale_id AS saleId,
          s.date,
          sp.product_id AS productId,
          sp.quantity
      FROM
          StoreManager.sales_products AS sp
              INNER JOIN
          StoreManager.sales AS s ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id
    `;
    const sales = await connection.execute(query);
    return sales[0];
  },

};

module.exports = salesModel;