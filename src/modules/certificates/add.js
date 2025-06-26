const Certificates = require("./Certificates");

let SITE_URL = process.env.SITE_URL;
const addCertificatesService = async (req) => {
  try {
    const {
      image,
    } = req.body;

    const certificates = new Certificates({
      image,
    });

    await certificates.save();
    // console.log("Certificates saved successfully:", certificates); // Tekshirish uchun

    return certificates;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add certificates");
  }
};

module.exports = addCertificatesService;
