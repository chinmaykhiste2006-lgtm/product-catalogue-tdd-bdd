const express = require('express');
const path = require('path');
const routes = require('./routes/products');
const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../public')));
module.exports = app;
