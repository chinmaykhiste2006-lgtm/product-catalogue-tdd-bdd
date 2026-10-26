const Product = require('../../src/models/product');
const ProductFactory = require('../factories');
describe('Product model TDD', () => {
  it('should Read a Product', async () => {
    const product = await ProductFactory.create();
    const found = await Product.findByPk(product.id);
    expect(found).not.toBeNull();
    expect(found.name).toBe(product.name);
    expect(found.description).toBe(product.description);
    expect(found.price).toBe(product.price);
  });
  it('should Update a Product', async () => {
    const product = await ProductFactory.create();
    const id = product.id;
    await product.update({ description: 'testing' });
    const found = await Product.findByPk(id);
    expect(found.id).toBe(id);
    expect(found.description).toBe('testing');
  });
  it('should Delete a Product', async () => {
    const product = await ProductFactory.create();
    expect(await Product.count()).toBe(1);
    await product.destroy();
    expect(await Product.findByPk(product.id)).toBeNull();
    expect(await Product.count()).toBe(0);
  });
  it('should List All Products', async () => {
    expect(await Product.count()).toBe(0);
    await ProductFactory.createList(5);
    expect((await Product.findAll())).toHaveLength(5);
  });
  it('should Find a Product by Name', async () => {
    await ProductFactory.createList(3, { name: 'Test Product' });
    await ProductFactory.createList(2, { name: 'Other' });
    const found = await Product.findByName('Test Product');
    expect(found).toHaveLength(3);
    found.forEach(p => expect(p.name).toBe('Test Product'));
  });
  it('should Find Products by Category', async () => {
    await ProductFactory.createList(5, { category: 'Electronics' });
    await ProductFactory.createList(5, { category: 'Food' });
    const found = await Product.findByCategory('Electronics');
    expect(found).toHaveLength(5);
    found.forEach(p => expect(p.category).toBe('Electronics'));
  });
  it('should Find Products by Availability', async () => {
    await ProductFactory.createList(6, { available: true });
    await ProductFactory.createList(4, { available: false });
    const found = await Product.findByAvailability(true);
    expect(found).toHaveLength(6);
    found.forEach(p => expect(p.available).toBe(true));
  });
});
