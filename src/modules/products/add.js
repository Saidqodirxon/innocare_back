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
      about_uz,
      about_ru,
      about_en,
      is_view,
      categoryId,
      image,
      brandId,
      video,
      link_1,
      link_2,
      link_3,
      file,
      is_visible
    } = req.body;

    const products = new Products({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      about_uz,
      about_ru,
      about_en,
      is_view,
      categoryId,
      image,
      brandId,
      video,
      link_1,
      link_2,
      link_3,
      file,
      is_visible
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
