const mongoose = require("mongoose");

const BannersSchema = new mongoose.Schema(
  {
    name_uz: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    name_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    name_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_uz: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    image: {
      type: {
        url: {
          type: mongoose.SchemaTypes.String,
          required: true,
        },
        id: {
          type: mongoose.SchemaTypes.String,
          required: true,
        },
      },
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Banners = mongoose.model("Banners", BannersSchema);

module.exports = Banners;
