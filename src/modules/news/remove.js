const { NotFoundError } = require("../../shared/errors");
const News = require("./News");
const fs = require("fs");
const path = require("path");

const removeNewsService = async ({ id }) => {
  // Banner mavjudligini tekshirish
  const existing = await News.findById(id);
  console.log("Existing banner:", existing);

  if (!existing) {
    throw new NotFoundError("News Not Found.");
  }

  // Bannerda image maydoni borligini tekshirish va faylni o'chirish
  if (existing.image) {
    let fileId;

    // Agar image array bo‘lib, ichida obyektlar bo‘lsa
    if (Array.isArray(existing.image) && typeof existing.image[0] === "object" && existing.image[0].id) {
      fileId = existing.image[0].id;
    }

    // Agar image string bo‘lsa (yoki array emas bo‘lsa)
    else if (typeof existing.image === "string") {
      fileId = existing.image;
    }

    console.log(fileId, "fileID");
    console.log(id, "ID");

    if (fileId) {
      const filePath = path.join(__dirname, "../../../public/", fileId);
      console.log("Fayl yo'li:", filePath);

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
  let delProd = await News.findByIdAndDelete(id);

  return delProd;
};

module.exports = removeNewsService;
