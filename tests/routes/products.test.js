const request = require('supertest');
const app = require('../../src/app');
const Product = require('../../src/models/product');
const ProductFactory = require('../factories');
describe('Products REST API TDD', () => {
  it('should Read a Product', async () => {
    const p = await ProductFactory.create();
    const res = await request(app).get(`/api/products/${p.id}`).expect(200);
    expect(res.body.name).toBe(p.name);
  });
  it('should Update a Product', async () => {
    const product = await ProductFactory.create();
    const res = await request(app)
      .put(`/api/products/${product.id}`)
      .send({ description: 'unknown' }).expect(200);
    expect(res.body.description).toBe('unknown');
    expect((await Product.findByPk(product.id)).description).toBe('unknown');
  });
  it('should Delete a Product', async () => {
    const p = await ProductFactory.create();
    await request(app).delete(`/api/products/${p.id}`).expect(204);
    await request(app).get(`/api/products/${p.id}`).expect(404);
    expect(await Product.count()).toBe(0);
  });
  it('should List All Products', async () => {
    await ProductFactory.createList(5);
    const res = await request(app).get('/api/products').expect(200);
    expect(res.body).toHaveLength(5);
  });
  it('should List Products by Name', async () => {
    await ProductFactory.create({ name: 'Test Product' });
    const res = await request(app).get('/api/products?name=Test%20Product').expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Test Product');
  });
  it('should List Products by Category', async () => {
    await ProductFactory.create({ category: 'Electronics' });
    const res = await request(app).get('/api/products?category=Electronics').expect(200);
    expect(res.body[0].category).toBe('Electronics');
  });
  it('should List Products by Availability', async () => {
    await ProductFactory.createList(2, { available: true });
    await ProductFactory.create({ available: false });
    const res = await request(app).get('/api/products?available=true').expect(200);
    expect(res.body).toHaveLength(2);
    res.body.forEach(p => expect(p.available).toBe(true));
  });
});
