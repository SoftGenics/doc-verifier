import express from "express";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";
import adminAuth from "../../middlewares/authentication/admin_auth.js";
import { loginAdmin, logoutAdmin, fetchDashboardData } from "../../controllers/admin/base.js";
import {upload as uploadMiddleware} from "../../middlewares/multer.js";
import { uploadFile } from "../../lib/upload.js";

import {router as adminCollegeRouter} from "./college.js";
import {router as adminCompanyRouter} from "./company.js";

const router = express();


router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const payload = await loginAdmin(email, password);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({payload});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/logout", adminAuth, async (req, res) => {
  try {
    const {user, token} = req;
    await logoutAdmin(user, token);
    res.set("Authorization", "");
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const data = await fetchDashboardData();
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(data);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/upload-document", uploadMiddleware.single("file"), adminAuth, async (req, res) => {
  try {
    const uploadedFile = await uploadFile(req.file, req.body.category || "Admin Document", req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send({downloadLink: uploadedFile.downloadLink});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});



router.use("/college", adminCollegeRouter);
router.use("/company", adminCompanyRouter);


export {router};
