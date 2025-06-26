const Adventages = require("./Adventages");

let SITE_URL = process.env.SITE_URL;
const addAdventagesService = async (req) => {
  try {
    const { name_uz, name_ru, description_uz, description_ru, name_en, description_en, link } =
      req.body;

    const adventages = new Adventages({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      link,
    });

    await adventages.save();
    console.log("Adventages saved successfully:", adventages);

    return adventages;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add adventages");
  }
};

module.exports = addAdventagesService;
