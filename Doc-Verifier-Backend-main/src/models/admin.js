import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

import { generateError, RESPONSE_CODES } from "../lib/common.js";


const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
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
    password: {
      type: String,
      required: true
    },
    tokens: {
      type: [String],
      default: []
    },
    currentToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

AdminSchema.methods.generateToken = async function() {
  const admin = this;
  const payload = {
    _id: admin._id
  };
  const token = jwt.sign(payload, "2a209bdf-78a2-4051-8d63-eaaa13bba0b4");
  admin.currentToken = token;
  admin.tokens.push(token);
  await admin.save();
  return token;
};

AdminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({
    email: email
  });
  if (!admin) {
    throw generateError(RESPONSE_CODES.NOT_FOUND_ERROR_CODE, "Email is invalid");
  }
  const passwordMatched = await bcrypt.compare(password, admin.password);
  if (!passwordMatched) {
    throw generateError(RESPONSE_CODES.UNAUTHORIZED_ERROR_CODE, "Invalid Password");
  }
  return admin;
};


AdminSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
