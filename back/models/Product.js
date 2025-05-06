class Product {
    constructor({
      id,code,name,description,image,category,
      price,quantity,internalReference,shellId,inventoryStatus,rating,
    }) 
    {
      this.id = id;
      this.code = code;
      this.name = name;
      this.description = description;
      this.image = image;
      this.category = category;
      this.price = price;
      this.quantity = quantity;
      this.internalReference = internalReference;
      this.shellId = shellId;
      this.inventoryStatus = inventoryStatus || this.calcule_de_Inventory();
      this.rating = rating || 0;
      this.createdAt = Date.now();
      this.updatedAt = Date.now();
    }
  
    calcule_de_Inventory() {
      if (this.quantity <= 0) return "OUTOFSTOCK";
      if (this.quantity < 10) return "LOWSTOCK";
      return "INSTOCK";
    }
  
    update(data) {
      Object.keys(data).forEach(key => {
        if (key in this && key !== 'id' && key !== 'createdAt') {
          this[key] = data[key];
        }
      });
      this.inventoryStatus = this.calcule_de_Inventory();
      this.updatedAt = Date.now();
      return this;
    }
    static from(obj) {
      const prod = new Product();
      Object.assign(prod, obj);
      return prod;
    }
}

module.exports = Product;