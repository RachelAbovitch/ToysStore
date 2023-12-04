const express = require("express");
const {
    register,
    login,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/", auth(), getAllUsers);
// router.get("/:id", auth(), getUserById);
// router.put("/:id", auth(), editUser);
// router.delete("/:id", auth(), deleteUser);

module.exports = router;