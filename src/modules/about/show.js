const { NotFoundError } = require("../../shared/errors");
const About = require("./About");

const showAboutService = async ({ id }) => {
  try {
    const banners = await About.findById(id);

    if (!banners) {
      throw new NotFoundError("About not found.");
    }

    return banners;
  } catch (error) {
    throw error;
  }
};

module.exports = showAboutService;
