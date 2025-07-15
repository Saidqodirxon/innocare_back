const Joi = require("joi");

exports.addBrandsSchema = {
  body: Joi.object({
    name: Joi.string(),
  }),
};

exports.patchBrandsSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    _id: Joi.string(),
    name: Joi.string(),
  }),
};

exports.allBrandsSchema = {
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
