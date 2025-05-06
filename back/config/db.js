const fs = require('fs');
const path = require('path');


class JSONStorage {
  constructor(filename) {
    this.filePath = path.join(__dirname, `../datas/${filename}`);
    this.ensureFileExists();
  }

  ensureFileExists() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]', 'utf8');
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${this.filePath}:`, error);
      return [];
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Error writing ${this.filePath}:`, error);
      return false;
    }
  }

  findById(id) {
    const items = this.read();
    return items.find(item => String(item.id) === String(id));
  }

  findBy(key, value) {
    const items = this.read();
    
    return items.find(item => item[key] === value);
  }

  findAll() {
    return this.read();
  }

  create(item) {
    const items = this.read();
    items.push(item);
    this.write(items);
    return item;
  }

  update(id, updates) {
    const items = this.read();
    const index = items.findIndex(item => String(item.id) === String(id));
    if (index !== -1) {

      items[index] = { ...items[index], ...updates, updatedAt: Date.now() };
      
      fs.writeFileSync(this.filePath, JSON.stringify(items, null, 2), 'utf8');
      
      const updatedData = fs.readFileSync(this.filePath, 'utf8');
      const parsedData = JSON.parse(updatedData);
      const updatedItem = parsedData.find(item => String(item.id) === String(id));
      
      if (!updatedItem) {
        throw new Error('Failed to persist changes');
      }
      
      return items[index];
    }
    return null;
  }

  delete(id) {
    const items = this.read();
    const filteredItems = items.filter(item => String(item.id) !== String(id));
    this.write(filteredItems);
    return filteredItems.length !== items.length;
  }
}


const usersPath = path.join(__dirname, '../datas/users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erreur de lecture du fichier:', err);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur d ajout dans le fichier:', err);
  }
};

// Trouver un utilisateur par email
const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find(user => user.email === email);
};

// Ajouter un nouvel utilisateur
const addUser = (user) => {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
};

const findUserById = (id) => {
    const users = readUsers();
    return users.find(user => user.id === id);
};

// Instances pour les produits et paniers
const productsStorage = new JSONStorage('products.json');
const cartsStorage = new JSONStorage('carts.json');
module.exports = {
  findUserByEmail,
  addUser,
  findUserById,
  productsStorage,
  cartsStorage
};
