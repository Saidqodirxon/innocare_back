const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addPartnersSchema,
  patchPartnersSchema,
  allPartnersSchema,
} = require("./_schemas");
const addPartnersService = require("./add");
const editPartnersService = require("./edit");
const showPartnersService = require("./show");
const removePartnersService = require("./remove");
const allPartnersService = require("./all");
const { UnauthorizedError } = require("../../shared/errors");

const addPartners = async (req, res, next) => {
  try {
    console.log(req.file, "file");

    httpValidator({ body: req.body }, addPartnersSchema);

    const result = await addPartnersService(req);

    console.log(result, "result");

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    console.log(error);
    next(error);
  }
};

const patchPartners = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchPartnersSchema);

    const result = await editPartnersService({
      id: req.params.id,
      changes: { ...req.body },
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const showPartners = async (req, res, next) => {
  try {
    const result = await showPartnersService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPartners = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allPartnersSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allPartnersService({
      q: query.q,
      sort: query.sort,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.partners,
      pageInfo: {
        total: result.total,
        offset: result.offset,
        limit: result.limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deletePartners = async (req, res, next) => {
  try {
    const result = await removePartnersService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPartners,
  patchPartners,
  showPartners,
  deletePartners,
  getPartners,
};
