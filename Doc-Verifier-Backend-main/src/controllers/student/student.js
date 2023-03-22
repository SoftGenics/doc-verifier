import pkg from "lodash";
const { omit } = pkg;


import Student from "../../models/student.js";


const EMPLOYEE_GET_KEYS_NOT_TO_EXPOSE = ["registeredBy", "createdAt", "updatedAt", "__v"];


/**
 * TODO: send an Email to the registered employee regarding the email and password
*/
// export const createStudent = async (req,res) => {

//   const user=new Student(req.body)
//   console.log(req.body);
//   user.save(user).then(data=>{
//       res.send(data)})
//   .catch(err=>{
//       res.status(500).send({
//      message:err.message||'some err accur'});
// });


// };

export const createStudent = async (params, companyId) => {
  const employee = new Student({
    ...params,
    registeredBy: companyId
  });
  employee.userId = await User.findOrCreateUserByEmployeeParams(employee.toObject());
  await employee.save();
};

// export default createStudent=(req,res)=>{
//     const user=new Student(req.body)
//     user.save(user).then(data=>{
//         res.send(data)})
//     .catch(err=>{
//         res.status(500).send({
//        message:err.message||'some err accur'});
//  })
// }


/**
 * TODO: send an Email to the registered employee regarding the change in the email.
 * Also suggest him to change the primary email from corporate email to personal email to avoid
 * such changes.
*/





 
