const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('node:assert/strict');
const ids = { 'Id':'id', 'Name':'name', 'Description':'description', 'Price':'price', 'Category':'category', 'Available':'available' };
When('I visit the {string}', async function() {
  await this.driver.get(process.env.BASE_URL || 'http://localhost:8080');
});
When('I press the {string} button', async function(buttonText) {
  const button = await this.driver.findElement(By.xpath(`//button[normalize-space(.)="${buttonText}"]`));
  await button.click();
});
When('I set the {string} field to {string}', async function(field, value) {
  const el = await this.driver.findElement(By.id(ids[field]));
  await el.clear(); await el.sendKeys(value);
});
When('I select {string} in the {string} dropdown', async function(value, field) {
  await this.driver.findElement(By.id(ids[field])).findElement(By.xpath(`./option[normalize-space(.)="${value}"]`)).click();
});
When('I copy the {string} of {string} from the results', async function(field, productName) {
  const row = await this.driver.findElement(By.xpath(`//table/tbody/tr[td[normalize-space(.)="${productName}"]]`));
  this.copiedId = await row.findElement(By.css('td:first-child')).getText();
});
When('I paste the copied ID into the {string} field', async function(field) {
  const el = await this.driver.findElement(By.id(ids[field]));
  await el.clear(); await el.sendKeys(this.copiedId);
});
Then('I should see {string} in the {string} field', async function(expected, field) {
  const value = await this.driver.findElement(By.id(ids[field])).getAttribute('value');
  assert.equal(value, expected);
});
Then('I should see {string} in the {string} dropdown', async function(expected, field) {
  const selected = await this.driver.findElement(By.id(ids[field])).findElement(By.css('option:checked')).getText();
  assert.equal(selected, expected);
});
Then('I should see {string} in the results', async function(expectedText) {
  const results = await this.driver.wait(until.elementLocated(By.id('search_results')), 5000);
  await this.driver.wait(until.elementTextContains(results, expectedText), 5000);
  assert.ok((await results.getText()).includes(expectedText));
});
Then('I should not see {string} in the results', async function(text) {
  const results = await this.driver.wait(until.elementLocated(By.id('search_results')), 5000);
  assert.ok(!(await results.getText()).includes(text), `Expected "${text}" not to be present in search results`);
});
Then('I should see the message {string}', async function(expectedMessage) {
  const flash = await this.driver.wait(until.elementLocated(By.id('flash_message')), 5000);
  await this.driver.wait(until.elementTextContains(flash, expectedMessage), 5000);
  assert.ok((await flash.getText()).includes(expectedMessage));
});
