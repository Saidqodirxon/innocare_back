const { NotFoundError } = require("../../shared/errors");
const Brands = require("./Brands");

const removeBrandsService = async ({ id }) => {
  const existing = await Brands.findById(id);

  if (!existing) {
    throw new NotFoundError("Brands Not Found.");
  }

  let delProd = await Brands.findByIdAndDelete(id);

  return delProd;
};

module.exports = removeBrandsService;
