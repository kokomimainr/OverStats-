const { Product, User } = require("../db/models");

class ProductServices {
  static getAllProducts = async () => {
    const product = await Product.findAll({ include: { model: User } });
    if (product) {
      return product;
    }
    return null;
  };

  static getProductByPk = async (id) => {
    const product = await Product.findByPk(id, { include: { model: User } });

    if (product) {
      return product;
    }
    return null;
  };

  static createProduct = async (
    image,
    name,
    description,
    amount,
    article,
    price,
    userId
  ) => {
    const product = await Product.create({
      image,
      name,
      description,
      price,
      amount,
      article,
      userId,
    });
    if (product) {
      const productWithUser = this.getProductByPk(product.id);
      return productWithUser;
    }
    return null;
  };
  static updateProduct = async (id, userId, {
    image,
    name,
    description,
    price,
    article,
    amount
  }) => {
    try {
      const product = await Product.findByPk(id);
      if (product) {
        await Product.update(
          { image, name, description, price, article, amount, userId },
          { where: { id } }
        );
        console.log('дошли до сюда');
        
        // console.log(await this.getProductByPk(product.id));
        const updatedProduct = await this.getProductByPk(product.id);
        
        return updatedProduct
      }
      return null;
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  static deleteProduct = async (id) => {
    const product = await Product.destroy({ where: { id } });
    if (product) {
      return product;
    }
    return null;
  };
}

module.exports = ProductServices;
