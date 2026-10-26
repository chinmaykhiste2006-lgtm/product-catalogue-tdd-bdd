const sequelize = require('./db');
const Product = require('./models/product');
const app = require('./app');
const PORT = Number(process.env.PORT || 8080);
async function main() {
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Product Catalogue listening on http://localhost:${PORT}`));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
