const products = require("./products");

class controllers { 
  static addNewProduct(product){
    return products.save(product);
  }
  static getProductById(id){
    return products.getById(id);
  }
  static getRandomProduct(){
    return products.getRandom();
  }
  static getAllProducts(){
    return products.getAll();
  }
  static updateProduct(id, updatedData){
    return products.update(id, updatedData);
  }
  static deleteProductById(id){
    return products.deleteById(id);
  }
  static deleteAllProducts(){
    return products.deleteAll();
  }
}

module.exports = controllers