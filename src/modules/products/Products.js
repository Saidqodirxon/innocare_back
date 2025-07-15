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
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
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
    image: {
      type: mongoose.SchemaTypes.Array,
      default: [],
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
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const products = mongoose.model("products", ProductsSchema);

module.exports = products;
