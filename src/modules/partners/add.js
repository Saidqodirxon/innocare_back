const Partners = require("./Partners");

let SITE_URL = process.env.SITE_URL;
const addPartnersService = async (req) => {
  try {
    const { name_uz, name_ru, description_uz, description_ru, name_en, description_en, image } =
      req.body;

    const partners = new Partners({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      image
    });

    await partners.save();
    console.log("Partners saved successfully:", partners);

    return partners;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add partners");
  }
};

module.exports = addPartnersService;
