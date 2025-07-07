const { NotFoundError } = require("../../shared/errors");
const Adventages = require("./Adventages");

const editAdventagesService = async ({ id, ...changes }) => {
  if ('_id' in changes) delete changes._id;

  try {
    const updatedAdventages = await Adventages.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedAdventages) {
      throw new NotFoundError("Adventages Not Found.");
    }

    return updatedAdventages;
  } catch (error) {
    throw error;
  }
};

module.exports = editAdventagesService;
