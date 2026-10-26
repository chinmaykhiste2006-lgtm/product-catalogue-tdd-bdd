process.env.DB_FILE = ':memory:';
const sequelize = require('../src/db');
require('../src/models/product');
beforeAll(async () => { await sequelize.sync({ force: true }); });
beforeEach(async () => { await sequelize.sync({ force: true }); });
afterAll(async () => { await sequelize.close(); });
