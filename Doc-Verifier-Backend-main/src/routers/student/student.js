import express, { response } from "express";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";
import {createStudent } from "../../controllers/student/student.js";
import companyAuth from "../../middlewares/authentication/company_auth.js";


const router = express();


router.get("/listofstudent",(req, res) => {
  
//   try {
//     const list = await fetchApplicationsList(req.user._id);
//     res.status(RESPONSE_CODES.SUCCESS_CODE).send(list);
//   } catch (err){
//     logger(err);
//     const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
//     res.status(status).send(errorResponse(message));
//   }

res.send("welcom")
console.log("welcom")
});
//router.post('/api/addclient',clientController.addClient);
router.post("/addstudent",async (req, res) => {
    try {
      await createStudent(req.body);
      res.status(RESPONSE_CODES.CREATED_CODE).send({created: true});
    } catch (err){
      logger(err);
      const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
      res.status(status).send(errorResponse(message));
    }
  });
  




export {router};
