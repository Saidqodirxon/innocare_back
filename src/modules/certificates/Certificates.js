const mongoose = require("mongoose");

const CertificatesSchema = new mongoose.Schema(
  {
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

const certificates = mongoose.model("certificates", CertificatesSchema);

module.exports = certificates;
