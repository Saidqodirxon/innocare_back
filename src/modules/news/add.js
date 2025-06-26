const News = require("./News");

let SITE_URL = process.env.SITE_URL;
const addNewsService = async (req) => {
  try {
    const { name_uz, name_ru, description_uz, description_ru, name_en, description_en, image } =
      req.body;

    const news = new News({
      name_uz,
      name_ru,
      name_en,
      description_uz,
      description_ru,
      description_en,
      image
    });

    await news.save();
    console.log("News saved successfully:", news);

    return news;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add news");
  }
};

module.exports = addNewsService;
