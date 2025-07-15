const mongoose = require("mongoose");

const BrandsSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    // image: {
    //   type: {
    //     url: {
    //       type: mongoose.SchemaTypes.String,
    //       required: true,
    //     },
    //     id: {
    //       type: mongoose.SchemaTypes.String,
    //       required: true,
    //     },
    //   },
    // },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Brands = mongoose.model("Brands", BrandsSchema);

module.exports = Brands;
