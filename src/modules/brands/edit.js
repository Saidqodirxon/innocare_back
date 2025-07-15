const { NotFoundError } = require("../../shared/errors");
const Brands = require("./Brands");

const editBrandsService = async ({ id, ...changes }) => {
  console.log(changes.changes);
  try {
    const updatedBrands = await Brands.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedBrands) {
      throw new NotFoundError("brands Not Found.");
    }

    return updatedBrands;
  } catch (error) {
    throw error;
  }
};

module.exports = editBrandsService;
