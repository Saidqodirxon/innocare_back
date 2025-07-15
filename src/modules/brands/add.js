const Services = require("./Brands");

let SITE_URL = process.env.SITE_URL;
const addBrandsService = async (req) => {
  try {
    const { name } = req.body;

    const services = new Services({
      name
    });

    await services.save();
    console.log("Services saved successfully:", services); // Tekshirish uchun

    return services;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add services");
  }
};

module.exports = addBrandsService;
