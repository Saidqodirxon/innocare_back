const { NotFoundError } = require("../../shared/errors");
const Certificates = require("./Certificates");

const removeCertificatesService = async ({ id }) => {
  const existing = await Certificates.findById(id);

  if (!existing) {
    throw new NotFoundError("Certificates Not Found.");
  }

  let delProd = await Certificates.findByIdAndDelete(id);

  return delProd;
};

module.exports = removeCertificatesService;
