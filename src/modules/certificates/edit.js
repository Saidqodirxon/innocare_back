const { NotFoundError } = require("../../shared/errors");
const Certificates = require("./Certificates");

const editCertificatesService = async ({ id, ...changes }) => {
  // console.log(changes.changes);
  try {
    const updatedCertificates = await Certificates.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedCertificates) {
      throw new NotFoundError("Certificates Not Found.");
    }

    return updatedCertificates;
  } catch (error) {
    throw error;
  }
};

module.exports = editCertificatesService;
