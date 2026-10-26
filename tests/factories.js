const { faker } = require('@faker-js/faker');
const Product = require('../src/models/product');
const { Category } = Product;
class ProductFactory {
  static build(overrides = {}) {
    return Product.build({
      name: faker.helpers.arrayElement(['Hat', 'Pants', 'Shirt', 'Apple', 'Banana', 'Hammer']),
      description: faker.lorem.paragraph(),
      price: faker.number.float({ min: 0.5, max: 2000, fractionDigits: 2 }),
      available: faker.datatype.boolean(),
      category: faker.helpers.arrayElement(Object.values(Category)),
      ...overrides
    });
  }
  static async create(overrides = {}) { return await this.build(overrides).save(); }
  static buildList(count, overrides = {}) { return Array.from({length: count}, () => this.build(overrides)); }
  static async createList(count, overrides = {}) {
    return await Promise.all(Array.from({length: count}, () => this.create(overrides)));
  }
}
module.exports = ProductFactory;
