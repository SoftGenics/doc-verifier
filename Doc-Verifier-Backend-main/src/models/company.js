import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

import { generateError, RESPONSE_CODES } from "../lib/common.js";
import Employee from "./company/employee.js";


const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    unique: true,
    required: true,
  },
  secondaryNumber: {
    type: String,
    required: true,
  },
  faxNumber: {
    type: String,
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
  secondaryEmail: {
    type: String,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  motto: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    required: true,
  },
  // Corporate Identification Number
  cinNumber: {
    type: String,
    required: true,
  },
  certificateQuota: {
    type: Number,
    required: true,
  },
  totalCertificatesUploaded: {
    type: Number,
    default: 0,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    required: true,
  },
  instagramUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  facebookUrl: {
    type: String,
  },
  youtubeUrl: {
    type: String,
  },
  addresses: {
    type: [
      {
        completeAddress: {type: String, required: true},
        state: { type: String, required: true},
        city: { type: String, required: true},
        country: { type: String, default: "India" },
        pinCode: { type: String, required: true },
      },
    ],
    default: []
  },
  correspondent: {
    type: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      employmentProofUrl: {
        type: String,
        required: true,
      },
      identityProofUrl: {
        type: String,
        required: true,
      },
      aadhaarNumber: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      }
    },
    required: true
  },
  tokens: {
    type: [String],
    default: []
  },
  currentToken: {
    type: String
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  logs: {
    type: [
      {
        action: {type: String, required: true},
        userId: { type: mongoose.Schema.Types.ObjectId, required: true},
        actionTime: { type: Date, required: true },
      },
    ],
    default: []
  },
},
{
  timestamps: true
}
);

CompanySchema.methods.generateToken = async function() {
  const company = this;
  const payload = {
    _id: company._id
  };
  const token = jwt.sign(payload,"2a209bdf-78a2-4051-8d63-eaaa13bba0b4");
  company.currentToken = token;
  company.tokens.push(token);
  await company.save();
  return token;
};


CompanySchema.methods.employees = async function() {
  const employees = await Employee.find({registeredBy: this._id});
  return employees;
};


CompanySchema.statics.findByCredentials = async (email, password) => {
  const company = await Company.findOne({
    email: email
  });
  if (!company) {
    throw generateError(RESPONSE_CODES.NOT_FOUND_ERROR_CODE, "Email is invalid");
  }
  const passwordMatched = await bcrypt.compare(password, company.password);
  if (!passwordMatched) {
    throw generateError(RESPONSE_CODES.UNAUTHORIZED_ERROR_CODE, "Invalid Password");
  }
  return company;
};


CompanySchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  if (this.uniqueId === "TBS" || this.uniqueId === undefined) {
    this.uniqueId = `DVCOMP${Date.now()}`;
  }
  next();
});

const Company = mongoose.model("Company", CompanySchema);

export default Company;
