const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const sequelize = require('../../src/db');
require('../../src/models/product');
setDefaultTimeout(20000);
Before(async function() {
  await sequelize.sync({ force: true });
  this.driver = await new Builder().forBrowser(process.env.BROWSER || 'chrome').build();
});
After(async function() { if(this.driver) await this.driver.quit(); });
