const { NotFoundError } = require("../../shared/errors");
const About = require("./About");

const editAboutService = async ({ id, changes }) => {
  if ('_id' in changes) delete changes._id;

  const updatedAbout = await About.findByIdAndUpdate(id, changes, {
    new: true,
  });

  if (!updatedAbout) {
    throw new NotFoundError("About Not Found.");
  }

  return updatedAbout;
};


module.exports = editAboutService;
