const express = require("express");
const { addNewJobCtrl, getJobByIdCtrl, updateJobByIdCtrl, deleteJobByIdCtrl, getAllJobsByUserIdCtrl } = require("./job.controller");
const jobRouter = express.Router();
const { verifyToken, verifyTokenAndOnlyUser } = require("./../../middlewares/verifyToken")

jobRouter.route("/")
    .post(verifyToken, addNewJobCtrl)

jobRouter.route("/:id")
    .get(verifyTokenAndOnlyUser, getAllJobsByUserIdCtrl)
    .post(verifyTokenAndOnlyUser, addNewJobCtrl)

jobRouter.route("/:id/:jobId")
    .get(verifyTokenAndOnlyUser, getJobByIdCtrl)
    .put(verifyTokenAndOnlyUser, updateJobByIdCtrl)
    .delete(verifyTokenAndOnlyUser, deleteJobByIdCtrl)

module.exports = jobRouter