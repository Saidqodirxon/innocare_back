const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addAdventages,
  patchAdventages,
  showAdventages,
  deleteAdventages,
  getAdventages,
} = require("./_controllers");
const upload = require("../../shared/upload");

const router = express.Router();

router.post("/adventages", addAdventages);
router.get("/adventages", getAdventages);
router.get("/adventages/:id", showAdventages);
router.patch("/adventages/:id", isLoggedIn, patchAdventages);
router.delete("/adventages/:id", isLoggedIn, deleteAdventages);

module.exports = router;
