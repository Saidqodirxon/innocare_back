const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addCertificatesSchema,
  patchCertificatesSchema,
  allCertificatesSchema,
} = require("./_schemas");
const addCertificatesService = require("./add");
const editCertificatesService = require("./edit");
const showCertificatesService = require("./show");
const removeCertificatesService = require("./remove");
const allCertificatesService = require("./all");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addCertificates = async (req, res, next) => {
  try {
    // console.log(req.file, "file");

    httpValidator({ body: req.body }, addCertificatesSchema);

    const result = await addCertificatesService(req);

    // console.log(result, "result");

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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const patchCertificates = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchCertificatesSchema);
    if (req?.file) {
      let SITE_URL = process.env.SITE_URL;
      let image = `${SITE_URL}/${req.file.filename}`;
      // console.log(`${SITE_URL}/${req.file.filename}`);
      // Only pass the necessary data from req.body
      req.body.image = image;
    }
    const result = await editCertificatesService({
      id: req.params.id,
      changes: { ...req.body }, // Include image in the changes
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showCertificates = async (req, res, next) => {
  try {
    const result = await showCertificatesService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getCertificates = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allCertificatesSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allCertificatesService({
      q: query.q, // Pass search query
      sort: query.sort,
      page: { limit, offset },
      is_visible: query.is_visible,
      view: query.view,
      categoryId: query.categoryId, // Pass categoryId to service
    });

    res.status(200).json({
      data: result.certificates,
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


/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteCertificates = async (req, res, next) => {
  try {
    const result = await removeCertificatesService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCertificates,
  patchCertificates,
  showCertificates,
  deleteCertificates,
  getCertificates,
};
