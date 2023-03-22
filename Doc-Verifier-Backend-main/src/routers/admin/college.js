import express from "express";
import {
  deleteCollege,
  fetchCollegeList,
  toggleBlockCollege,
  fetchCollegeDetails,
  createCollege,
  updateCollege
} from "../../controllers/admin/college.js";

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
    const collegeList = await fetchCollegeList(pageNo, perPage, filter);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(collegeList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/", adminAuth, async (req, res) => {
  try {
    const {id: collegeId} = req.query;
    const collegeDetails = await fetchCollegeDetails(collegeId);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(collegeDetails);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});



router.post("/", adminAuth, async (req, res) => {
  try {
    await createCollege(req.body, req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send({created: true});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/", adminAuth, async (req, res) => {
  try {
    const {id: collegeId, ...updateParams} = req.body;
    await updateCollege(updateParams, collegeId, req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send({updated: true});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});



router.post("/toggle-block", adminAuth, async (req, res) => {
  try {
    const {collegeId, requiredState} = req.body;
    const updatedList = await toggleBlockCollege(requiredState, collegeId, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.delete("/delete", adminAuth, async (req, res) => {
  try {
    const {collegeId } = req.body;
    const updatedList = await deleteCollege(collegeId, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
