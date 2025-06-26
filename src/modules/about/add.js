const About = require("./About");

let SITE_URL = process.env.SITE_URL;
const addAboutService = async (req) => {
  try {
    const {
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      link,
    } = req.body;

    const banners = new About({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      link,
    });

    await banners.save();
    console.log("About saved successfully:", banners);

    return banners;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add abouts");
  }
};

module.exports = addAboutService;
