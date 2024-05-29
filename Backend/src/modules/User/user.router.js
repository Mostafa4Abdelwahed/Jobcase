const express = require("express");
const userRouter = express.Router();
const { addNewUserCtrl, getAllUsers, getUserById, loginUserCtrl, updateUserCtrl } = require("./user.controller")
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("./../../middlewares/verifyToken")

userRouter.route("/users")
    .get(verifyTokenAndAdmin, getAllUsers)

userRouter.route("/profile/:id")
    .get(verifyTokenAndOnlyUser, getUserById)
    .put(verifyTokenAndOnlyUser, updateUserCtrl)

userRouter.post("/register", addNewUserCtrl)
userRouter.post("/login", loginUserCtrl)

module.exports = userRouter