const express = require("express");
const { getAllToys, getToyById, addToy, updateToy, deleteToy, getByCategory, getToyByInfoOrName } = require("../controllers/toyController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllToys);
router.get("/:id", getToyById);
router.get("/getByCategory", getByCategory);
router.get("/getToyByInfoOrName", getToyByInfoOrName);
router.post("/", auth(), addToy);
router.put("/:id", auth(), updateToy);
router.delete("/:id", auth(), deleteToy);

module.exports = router;

