const express = require("express");
const AuthMiddleware = require("../middlewares/authMiddleware");
const UserApi = require("../api/user");
const router = express.Router();

router.get("/auth", AuthMiddleware.validateToken, UserApi.auth);
router.post("/login", UserApi.login);
router.post("/logout", UserApi.logout);
router.post("/", UserApi.createUser);
router.put("/:id", AuthMiddleware.validateToken, UserApi.updateUser);
router.get("/", AuthMiddleware.validateToken, UserApi.findUsers);
router.get("/:id", AuthMiddleware.validateToken, UserApi.findUser);
router.delete("/:id", AuthMiddleware.validateToken, UserApi.deleteUser);

module.exports = router;
