const { NotFoundError } = require("../../shared/errors");
const Certificates = require("./Certificates");

const showCertificatesService = async ({ id }) => {
  try {
    const certificates = await Certificates.findById(id);

    if (!certificates) {
      throw new NotFoundError("Certificates not found.");
    }

    return certificates;
  } catch (error) {
    throw error;
  }
};

module.exports = showCertificatesService;
