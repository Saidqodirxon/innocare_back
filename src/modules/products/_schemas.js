const Joi = require("joi");

exports.addProductsSchema = {
  body: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    categoryId: Joi.string(),
    file: Joi.object(),
    image: Joi.array(),
    link: Joi.string(),
  }),
};

exports.patchProductsSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    _id: Joi.string(),
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    categoryId: Joi.string(),
    file: Joi.object(),
    image: Joi.array(),
    link: Joi.string(),
  }),
};

exports.allProductsSchema = {
  query: Joi.object({
    q: Joi.string(),
    is_visible: Joi.string().valid("true", "false"),
    view: Joi.string().valid("1", "2", "all"),
    categoryId: Joi.string().optional(), // Add categoryId as optional string (or use .required() if mandatory)
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
