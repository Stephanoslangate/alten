const Cart = require('../models/Cart');
const Product = require('../models/Product');

const { cartsStorage, productsStorage } = require('../config/db');

exports.getOrCreateCart = (req, res) => {
  try {
    let cart = cartsStorage.findById(req.params.userId);
    
    if (!cart) {
      cart = new Cart(req.params.userId);
      cartsStorage.create(cart);
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOCreate = (req, res) => {
  try {
    let cart = cartsStorage.findById(req.params.userId);
    
    if (!cart) {
      cart = new Cart(req.params.userId);
      cartsStorage.create(cart);
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = productsStorage.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    //getOCreate(req.params.userId);
    let cart = cartsStorage.findById(req.params.userId);
    if (!cart) {
      cart = new Cart(req.params.userId);
    }
    
    const Macart = Cart.from(cart);
    Macart.addItem(productId, quantity);
    cartsStorage.update(req.params.userId, Macart);
     
    product.quantity = product.quantity - quantity
    const updatedProduct = new Product(product).update(product);
    productsStorage.update(productId, updatedProduct);
     
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const cart = cartsStorage.findById(req.params.userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    
    const Macart = Cart.from(cart);
    Macart.removeItem(req.params.productId);
    cartsStorage.update(req.params.userId, Macart);
    

    res.json(Macart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItemQuantity = (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = cartsStorage.findById(req.params.userId);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const Macart = Cart.from(cart);
    Macart.updateItemQuantity(req.params.productId, quantity);
    cartsStorage.update(req.params.userId, Macart);
    
    res.json(Macart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = (req, res) => {
  try {
    const cart = cartsStorage.findById(req.params.userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.clear();
    cartsStorage.update(req.params.userId, cart);
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCartWithProducts = (req, res) => {
  try {
    const cart = cartsStorage.findById(req.params.userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const products = productsStorage.findAll();
    const cartWithProducts = {
      ...cart,
      items: cart.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          product: product ? { 
            ...product,
            total: product.price * item.quantity
          } : null
        };
      }),
      total: cart.items.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0)
    };
    
    res.json(cartWithProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};