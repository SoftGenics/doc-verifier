import express from "express";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";


import companyAuth from "../../middlewares/authentication/company_auth.js";
import {upload as uploadMiddleware} from "../../middlewares/multer.js";
import { uploadFile } from "../../lib/upload.js";
import { fetchCompanyData, loginCompany, logoutCompany, updateCompanyInfo } from "../../controllers/company/base.js";


import { router as companyEmployeeRouter } from "./employee.js";
import { router as companyApplicationRouter } from "./application.js";
import { router as companyExternalCertificatesRouter } from "./external_certificates.js";


const router = express();


router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const payload = await loginCompany(email, password);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({payload});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/logout", companyAuth, async (req, res) => {
  try {
    const {user, token} = req;
    await logoutCompany(user, token);
    res.set("Authorization", "");
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/dashboard", companyAuth, async (req, res) => {
  try {
    const data = await fetchCompanyData(req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(data);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/upload-document", uploadMiddleware.single("file"), companyAuth, async (req, res) => {
  try {
    const {category = "Company Documents"} = req.body;
    const uploadedFile = await uploadFile(req.file, category, req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send({downloadLink: uploadedFile.downloadLink});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/update-details", companyAuth, async (req, res) => {
  try {
    const updatedCompany = await updateCompanyInfo(req.body, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedCompany);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.use("/employee", companyEmployeeRouter);
router.use("/application", companyApplicationRouter);
router.use("/external-certificates", companyExternalCertificatesRouter);

export {router};
