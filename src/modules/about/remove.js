const { NotFoundError } = require("../../shared/errors");
const About = require("./About");

const removeAboutService = async ({ id }) => {
  const existing = await About.findById(id);

  if (!existing) {
    throw new NotFoundError("About Not Found.");
  }

  let delProd = await About.findByIdAndDelete(id);

  return delProd;
};

module.exports = removeAboutService;
