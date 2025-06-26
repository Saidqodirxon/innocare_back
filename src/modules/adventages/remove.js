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

    // Agar image object bo'lsa va id mavjud bo'lsa
    if (typeof existing.image[0] === "object" && existing.image[0].id) {
      fileId = existing.image[0].id;
    }
    // Agar image string bo'lsa
    else if (typeof existing[0].image === "string") {
      fileId = existing[0].image;
    }

    console.log(fileId, "fileID");
    console.log(id, "ID");

    if (fileId) {
      const filePath = path.join(__dirname, "../../../public/", fileId);
      console.log("Fayl yo'li:", filePath);

      // Fayl mavjud bo'lsa o'chirish
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Fayl o'chirildi:", filePath);
      } else {
        console.log("Fayl topilmadi:", filePath);
      }
    } else {
      console.log("Fayl ID topilmadi");
    }
  } else {
    console.log("Image maydoni mavjud emas");
  }

  // Bannerni bazadan o'chirish
  let delProd = await Adventages.findByIdAndDelete(id);

  return delProd;
};

module.exports = removeAdventagesService;
