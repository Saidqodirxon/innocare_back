const Products = require("./Products");

let SITE_URL = process.env.SITE_URL;
const addProductsService = async (req) => {
  try {
    const {
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      categoryId,
      image,
      link,
      file
    } = req.body;

    const products = new Products({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      categoryId,
      image,
      link,
      file
    });

    await products.save();
    console.log("Products saved successfully:", products); // Tekshirish uchun

    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add products");
  }
};

module.exports = addProductsService;
