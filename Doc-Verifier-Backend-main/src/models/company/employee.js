/**
 * This model is just for storing data of company employees. There are no login etc operations.
 * Evert employee object will have a corresponding user object in the DB.
 * And on code level User object will be used for all User portal related opertations.
 */

import mongoose from "mongoose";
import validator from "validator";


const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  dob: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  linkedInUrl: {
    type: String,
    default: "",
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
  addresses: {
    type: [
      {
        completeAddress: {type: String, required: true},
        city: { type: String, required: true},
        state: { type: String, required: true},
        country: { type: String, default: "India" },
        pinCode: { type: String, required: true },
      },
    ],
    default: []
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
},
{
  timestamps: true
}
);


const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
