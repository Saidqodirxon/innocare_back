const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
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
    about_uz: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    about_ru: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    about_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description_en: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_view: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Categories",
    },
    file: {
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
    brandId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Brands",
    },
    image: {
      type: mongoose.SchemaTypes.Array,
      default: [],
    },
    video: {
      type: mongoose.SchemaTypes.String,
    },
    link_1: {
      type: mongoose.SchemaTypes.String,
    },
    link_2: {
      type: mongoose.SchemaTypes.String,
    },
    link_3: {
      type: mongoose.SchemaTypes.String,
    },
    is_visible: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const products = mongoose.model("products", ProductsSchema);

module.exports = products;
