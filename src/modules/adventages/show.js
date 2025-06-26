const { NotFoundError } = require("../../shared/errors");
const Adventages = require("./Adventages");

const showAdventagesService = async ({ id }) => {
  try {
    const adventages = await Adventages.findById(id);

    if (!adventages) {
      throw new NotFoundError("Adventages not found.");
    }

    return adventages;
  } catch (error) {
    throw error;
  }
};

module.exports = showAdventagesService;
