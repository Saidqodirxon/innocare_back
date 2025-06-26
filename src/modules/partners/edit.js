const { NotFoundError } = require("../../shared/errors");
const Partners = require("./Partners");

const editPartnersService = async ({ id, ...changes }) => {
  console.log(changes.changes);
  try {
    const updatedPartners = await Partners.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedPartners) {
      throw new NotFoundError("Partners Not Found.");
    }

    return updatedPartners;
  } catch (error) {
    throw error;
  }
};

module.exports = editPartnersService;
