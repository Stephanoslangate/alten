class Cart {
    constructor(userId) {
      this.id = userId || require('uuid').v4();
      this.items = []; 
      this.createdAt = Date.now();
      this.updatedAt = Date.now();
    }
  
    addItem(productId, quantity = 1) {
      const existingItem = this.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ productId, quantity });
      }
      this.updatedAt = Date.now();
      return this;
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.productId !== productId);
      this.updatedAt = Date.now();
      return this;
    }
  
    updateItemQuantity(productId, quantity) {
      const item = this.items.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        this.updatedAt = Date.now();
      }
      return this;
    }
  
    clear() {
      this.items = [];
      this.updatedAt = Date.now();
      return this;
    }

    static from(obj) {
      const cart = new Cart();
      Object.assign(cart, obj);
      return cart;
    }
  }
  
  module.exports = Cart;