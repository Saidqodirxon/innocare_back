const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addBanners,
  patchBanners,
  showBanners,
  deleteBanners,
  getBanners,
} = require("./_controllers");
const upload = require("../../shared/upload");

const router = express.Router();

router.post("/banners", addBanners);
router.get("/banners", getBanners);
router.get("/banners/:id", showBanners);
router.patch("/banners/:id", isLoggedIn, patchBanners);
router.delete("/banners/:id", isLoggedIn, deleteBanners);

module.exports = router;
