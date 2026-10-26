const { Given } = require('@cucumber/cucumber');
const Product = require('../../src/models/product');
Given('the following products', async function(dataTable) {
  for (const row of dataTable.hashes()) {
    await Product.create({
      name: row.name,
      description: row.description,
      price: Number(row.price),
      category: row.category,
      available: row.available.toLowerCase() === 'true'
    });
  }
});
