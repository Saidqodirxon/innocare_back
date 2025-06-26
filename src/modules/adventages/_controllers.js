const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addAdventagesSchema,
  patchAdventagesSchema,
  allAdventagesSchema,
} = require("./_schemas");
const addAdventagesService = require("./add");
const editAdventagesService = require("./edit");
const showAdventagesService = require("./show");
const removeAdventagesService = require("./remove");
const allAdventagesService = require("./all");
const { UnauthorizedError } = require("../../shared/errors");

const addAdventages = async (req, res, next) => {
  try {
    console.log(req.file, "file");

    httpValidator({ body: req.body }, addAdventagesSchema);

    const result = await addAdventagesService(req);

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

const patchAdventages = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchAdventagesSchema);

    const result = await editAdventagesService({
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

const showAdventages = async (req, res, next) => {
  try {
    const result = await showAdventagesService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAdventages = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allAdventagesSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allAdventagesService({
      q: query.q,
      sort: query.sort,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.adventages,
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

const deleteAdventages = async (req, res, next) => {
  try {
    const result = await removeAdventagesService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAdventages,
  patchAdventages,
  showAdventages,
  deleteAdventages,
  getAdventages,
};
