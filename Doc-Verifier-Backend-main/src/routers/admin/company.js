import express from "express";
import {
  createCompany,
  deleteCompany,
  fetchCompanyDetails,
  fetchCompanyList,
  toggleBlockCompany,
  updateCompany
} from "../../controllers/admin/company.js";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";
import adminAuth from "../../middlewares/authentication/admin_auth.js";

const router = express();


/**
 * This API will be called for both on page load and on use of filter
 * and will also handle pagination
 */
router.get("/list", adminAuth, async (req, res) => {
  try {
    const {pageNo = 1, perPage = 6, filter = {}} = req.body;
    const collegeList = await fetchCompanyList(pageNo, perPage, filter);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(collegeList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/", adminAuth, async (req, res) => {
  try {
    const {id: companyId} = req.query;
    const collegeDetails = await fetchCompanyDetails(companyId);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(collegeDetails);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});



router.post("/", adminAuth, async (req, res) => {
  try {
    await createCompany(req.body, req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send({created: true});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/", adminAuth, async (req, res) => {
  try {
    const {id: companyId, ...updateParams} = req.body;
    const updatedCompany = await updateCompany(updateParams, companyId, req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send(updatedCompany);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});



router.post("/toggle-block", adminAuth, async (req, res) => {
  try {
    const {companyId, requiredState} = req.body;
    const updatedList = await toggleBlockCompany(requiredState, companyId, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.delete("/delete", adminAuth, async (req, res) => {
  try {
    const {companyId } = req.body;
    const updatedList = await deleteCompany(companyId, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
