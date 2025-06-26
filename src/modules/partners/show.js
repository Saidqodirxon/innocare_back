const { NotFoundError } = require("../../shared/errors");
const Partners = require("./Partners");

const showPartnersService = async ({ id }) => {
  try {
    const partners = await Partners.findById(id);

    if (!partners) {
      throw new NotFoundError("Partners not found.");
    }

    return partners;
  } catch (error) {
    throw error;
  }
};

module.exports = showPartnersService;
