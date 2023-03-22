import mongoose from "mongoose";
import validator from "validator";


const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Registration_no: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: {
    // type: [
    //   {
    //     completeAddress: {type: String, required: true},
    //     // city: { type: String, required: true},
    //     // state: { type: String, required: true},
    //     // country: { type: String, default: "India" },
    //     pinCode: { type: String, required: true },
    //   },
    // ],
    default: []
  },


  parentsname: {
    type: String,
    required: true,
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

  linkedInUrl: {
    type: String,
    default: "",
  },
 
  deleted: {
    type: Boolean,
    default: false
  },
 
  profilePictureUrl: {
    type: String,
    required: true,
  },
 
//   registeredBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
},
{
  timestamps: true
}
);


const Student = mongoose.model("Student", StudentSchema);

export default Student;