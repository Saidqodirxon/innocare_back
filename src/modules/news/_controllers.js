const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addNewsSchema,
  patchNewsSchema,
  allNewsSchema,
} = require("./_schemas");
const addNewsService = require("./add");
const editNewsService = require("./edit");
const showNewsService = require("./show");
const removeNewsService = require("./remove");
const allNewsService = require("./all");
const { UnauthorizedError } = require("../../shared/errors");

const addNews = async (req, res, next) => {
  try {
    console.log(req.file, "file");

    httpValidator({ body: req.body }, addNewsSchema);

    const result = await addNewsService(req);

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

const patchNews = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchNewsSchema);

    const result = await editNewsService({
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

const showNews = async (req, res, next) => {
  try {
    const result = await showNewsService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getNews = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allNewsSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allNewsService({
      q: query.q,
      sort: query.sort,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.news,
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

const deleteNews = async (req, res, next) => {
  try {
    const result = await removeNewsService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNews,
  patchNews,
  showNews,
  deleteNews,
  getNews,
};
