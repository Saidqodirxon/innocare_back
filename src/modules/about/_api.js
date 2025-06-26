const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addAbout,
  patchAbout,
  showAbout,
  deleteAbout,
  getAbout,
} = require("./_controllers");

const router = express.Router();

router.post("/abouts", addAbout);
router.get("/abouts", getAbout);
router.get("/abouts/:id", showAbout);
router.patch("/abouts/:id", isLoggedIn, patchAbout);
router.delete("/abouts/:id", isLoggedIn, deleteAbout);

module.exports = router;
