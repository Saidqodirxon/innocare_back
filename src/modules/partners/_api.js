const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addPartners,
  patchPartners,
  showPartners,
  deletePartners,
  getPartners,
} = require("./_controllers");
const upload = require("../../shared/upload");

const router = express.Router();

router.post("/partners", addPartners);
router.get("/partners", getPartners);
router.get("/partners/:id", showPartners);
router.patch("/partners/:id", isLoggedIn, patchPartners);
router.delete("/partners/:id", isLoggedIn, deletePartners);

module.exports = router;
