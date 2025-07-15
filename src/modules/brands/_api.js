const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addBrands,
  patchBrands,
  showBrands,
  deleteBrands,
  getBrands,
} = require("./_controllers");

const router = express.Router();

router.post("/brands", addBrands);
router.get("/brands", getBrands);
router.get("/brands/:id", showBrands);
router.patch("/brands/:id", isLoggedIn, patchBrands);
router.delete("/brands/:id", isLoggedIn, deleteBrands);

module.exports = router;
