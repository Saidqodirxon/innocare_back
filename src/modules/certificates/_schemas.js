const Joi = require("joi");

exports.addCertificatesSchema = {
  body: Joi.object({
    image: Joi.object(),
  }),
};

exports.patchCertificatesSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    _id: Joi.string(),
    image: Joi.object(),
  }),
};

exports.allCertificatesSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("_id"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(3),
    }),
  }),
};
