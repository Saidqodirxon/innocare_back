const Joi = require("joi");

exports.addAdventagesSchema = {
  body: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    link: Joi.string().optional().allow("", null),
    image: Joi.object({
      url: Joi.string(),
      id: Joi.string(),
      _id: Joi.string(),
    }),
  }),
};

exports.patchAdventagesSchema = {
  params: Joi.object({
    _id: Joi.string(),
  }),
  body: Joi.object({
    _id: Joi.string(),
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    name_en: Joi.string(),
    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
    image: Joi.object({
      url: Joi.string(),
      id: Joi.string(),
      _id: Joi.string(),
    }),
    link: Joi.string().optional().allow("", null),
  }),
};

exports.allAdventagesSchema = {
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
