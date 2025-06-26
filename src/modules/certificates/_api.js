const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addCertificates,
  patchCertificates,
  showCertificates,
  deleteCertificates,
  getCertificates,
} = require("./_controllers");

const router = express.Router();

router.post("/certificates", addCertificates);
router.get("/certificates", getCertificates);
router.get("/certificates/:id", showCertificates);
router.patch("/certificates/:id", isLoggedIn, patchCertificates);
router.delete("/certificates/:id", isLoggedIn, deleteCertificates);

module.exports = router;
