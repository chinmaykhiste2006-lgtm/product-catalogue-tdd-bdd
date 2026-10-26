const express = require('express');
const { Op } = require('sequelize');
const Product = require('../models/product');
const router = express.Router();

router.post('/products', async (req, res) => {
  try {
    if (!req.is('application/json')) return res.status(415).json({ error: 'JSON required' });
    const product = await Product.create(req.body);
    return res.status(201).json(product.serialize());
  } catch (error) { return res.status(400).json({ error: error.message }); }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.status(200).json(product.serialize());
  } catch (error) { return res.status(500).json({ error: error.message }); }
});

router.put('/products/:id', async (req, res) => {
  try {
    if (!req.is('application/json')) return res.status(415).json({ error: 'JSON required' });
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.update(req.body);
    return res.status(200).json(product.serialize());
  } catch (error) { return res.status(400).json({ error: error.message }); }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) await product.destroy();
    return res.status(204).send();
  } catch (error) { return res.status(500).json({ error: error.message }); }
});

router.get('/products', async (req, res) => {
  try {
    let products;
    if (req.query.name) {
      products = await Product.findAll({ where: { name: { [Op.like]: `%${req.query.name}%` } } });
    } else if (req.query.category) {
      products = await Product.findAll({ where: { category: req.query.category } });
    } else if (req.query.available !== undefined) {
      if (!['true', 'false'].includes(req.query.available)) return res.status(400).json({ error: 'available must be true or false' });
      products = await Product.findAll({ where: { available: req.query.available === 'true' } });
    } else {
      products = await Product.findAll();
    }
    return res.status(200).json(products.map(product => product.serialize()));
  } catch (error) { return res.status(500).json({ error: error.message }); }
});
module.exports = router;
