const { NotFoundError } = require("../../shared/errors");
const About = require("./About");

const editAboutService = async ({ id, ...changes }) => {
  console.log(changes.changes);
  try {
    const updatedAbout = await About.findByIdAndUpdate(id, changes.changes, {
      new: true,
    });

    if (!updatedAbout) {
      throw new NotFoundError("About Not Found.");
    }

    return updatedAbout;
  } catch (error) {
    throw error;
  }
};

module.exports = editAboutService;
