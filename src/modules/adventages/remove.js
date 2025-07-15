const { NotFoundError } = require("../../shared/errors");
const Adventages = require("./Adventages");
const fs = require("fs");
const path = require("path");

const removeAdventagesService = async ({ id }) => {
  // Banner mavjudligini tekshirish
  const existing = await Adventages.findById(id);
  console.log("Existing banner:", existing);

  if (!existing) {
    throw new NotFoundError("Adventages Not Found.");
  }

  // Bannerda image maydoni borligini tekshirish va faylni o'chirish
  if (existing.image) {
    let fileId;

    if (Array.isArray(existing.image)) {
      // Massiv ichida obyekt bor va u id bilan
      if (typeof existing.image[0] === "object" && existing.image[0]?.id) {
        fileId = existing.image[0].id;
      }
    } else if (typeof existing.image === "string") {
      // Image to'g'ridan-to'g'ri string
      fileId = existing.image;
    }

    if (fileId) {
      const filePath = path.join(__dirname, "../../../public/", fileId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Fayl o'chirildi:", filePath);
      } else {
        console.log("Fayl topilmadi:", filePath);
      }
    } else {
      console.log("Fayl ID topilmadi");
    }
  }
  else {
    console.log("Image maydoni mavjud emas");
  }

  // Bannerni bazadan o'chirish
  let delProd = await Adventages.findByIdAndDelete(id);

  return delProd;
};

module.exports = removeAdventagesService;
