const { NotFoundError } = require("../../shared/errors");
const Brands = require("./Brands");

const showBrandsService = async ({ id }) => {
  try {
    const brands = await Brands.findById(id);

    if (!brands) {
      throw new NotFoundError("brands not found.");
    }

    return brands;
  } catch (error) {
    throw error;
  }
};

module.exports = showBrandsService;
