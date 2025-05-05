const Product = require('../models/Product');
const { productsStorage } = require('../config/db');

exports.getAllProducts = (req, res) => {
  try {
    const products = productsStorage.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = (req, res) => {
  try {
    const product = productsStorage.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    const createdProduct = productsStorage.create(product);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const product = productsStorage.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = new Product(product).update(req.body);
    productsStorage.update(req.params.id, updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const product = productsStorage.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    productsStorage.delete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = (req, res) => {
  try {
    const products = productsStorage.findAll();
    const filteredProducts = products.filter(
      product => product.category === req.params.category
    );
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};