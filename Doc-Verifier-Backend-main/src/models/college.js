import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

import { generateError, RESPONSE_CODES } from "../lib/common.js";


const CollegeSchema = new mongoose.Schema({
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
  ugcGrantCertificateUrl: {
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

CollegeSchema.methods.generateToken = async function() {
  const college = this;
  const payload = {
    _id: college._id
  };
  const token = jwt.sign(payload, process.env("COMPANY_SECRET"));
  college.currentToken = token;
  college.tokens.push(token);
  await college.save();
  return token;
};

CollegeSchema.statics.findByCredentials = async (email, password) => {
  const college = await College.findOne({
    email: email,
    deleted: false,
  });
  if (!college) {
    throw generateError(RESPONSE_CODES.NOT_FOUND_ERROR_CODE, "Email is invalid");
  }
  if (college.blocked) {
    throw generateError(RESPONSE_CODES.FORBIDDEN_ERROR_CODE, "Your account is blocked, please contact the administrator for further steps");
  }
  const passwordMatched = await bcrypt.compare(password, college.password);
  if (!passwordMatched) {
    throw generateError(RESPONSE_CODES.UNAUTHORIZED_ERROR_CODE, "Invalid Password");
  }
  return college;
};


CollegeSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  if (this.uniqueId === "TBS" || this.uniqueId === undefined) {
    this.uniqueId = `DVCOL${Date.now()}`;
  }
  next();
});

const College = mongoose.model("College", CollegeSchema);

export default College;
