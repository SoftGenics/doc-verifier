import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";
import pkg from "lodash";
const {omit} = pkg;

import { dateInMmDdyyyyV1, generateError, RESPONSE_CODES } from "../lib/common.js";


const UserSchema = new mongoose.Schema({
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
    default: "",
  },
  dob: {
    type: Date,
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
  otherEmails: {
    type: [
      {
        address: {
          type: String,
          lowercase: true,
          required: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid Email");
            }
          }
        },
        source: {
          type: String,
          required: true,
          enum: ["company", "college", "self"]
        },
        collegeId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        companyId: {
          type: mongoose.Schema.Types.ObjectId,
        }
      }
    ],
    default: [],
    unique: true,
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
  linkedinUrl: {
    type: String,
    default: "",
  },
  profilePictureUrl: {
    type: String,
    default: "",
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
  tokens: {
    type: [String],
    default: []
  },
  currentToken: {
    type: String
  },
},
{
  timestamps: true
}
);


UserSchema.methods.generateToken = async function() {
  const user = this;
  const payload = {
    _id: user._id
  };
  const token = jwt.sign(payload, "2a209bdf-78a2-4051-8d63-eaaa13bba0b4");
  user.currentToken = token;
  user.tokens.push(token);
  await user.save();
  return token;
};


UserSchema.statics.findByCredentials = async (email, password) => {
  let user = undefined;
  const userByPrimaryEmail = await User.findOne({
    email: email,
    deleted: false,
  });

  if (userByPrimaryEmail) {
    user = userByPrimaryEmail;
  } else {
    // user is trying to login by secondary email
    user = User.findOne({otherEmails: {$elemMatch: {address: email}}});
  }

  if (!user) {
    throw generateError(RESPONSE_CODES.NOT_FOUND_ERROR_CODE, "Email is invalid");
  }
  if (user.blocked) {
    throw generateError(RESPONSE_CODES.FORBIDDEN_ERROR_CODE, "Your account is blocked, please contact the administrator for further steps");
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw generateError(RESPONSE_CODES.UNAUTHORIZED_ERROR_CODE, "Invalid Password");
  }
  return user;
};


UserSchema.statics.findOrCreateUserByEmployeeParams = async (params) => {
  const existingUser = await User.findOne({otherEmails: {$elemMatch: {address: params.email}}});
  if (existingUser !== null) {
    return existingUser._id;
  }
  const userParams = omit(params, ["deleted", "userId"]);
  userParams["otherEmails"] = [{
    address: params.email,
    source: "company",
    companyId: params.registeredBy,
  }];
  userParams["password"] = userParams.uniqueId + dateInMmDdyyyyV1(userParams.dob);
  userParams["uniqueId"] = "TBS";

  const user = new User(userParams);
  await user.save();
  return user._id;
};


UserSchema.statics.findByEmail = async (otherEmail) => {
  const existingUser = await User.findOne({otherEmails: {$elemMatch: {address: otherEmail}}});
  return existingUser;
};


/**
 * @param {id of the user to update} userId
 * @param {new email} newEmail
 * @param {old email} oldEmail
 * This function updates the primary email if required and the other emails object.
 */
UserSchema.statics.updateUserByEmployeeParams = async (userId, newEmail, oldEmail) => {
  let existingUser = await User.findOne({_id: userId, otherEmails: {$elemMatch: {address: oldEmail}}});
  if (existingUser.email === oldEmail) {
    existingUser.email = newEmail;
  }
  const indexToUpdate = existingUser.otherEmails.findIndex((emailObject) => emailObject.address === oldEmail);
  existingUser.otherEmails[indexToUpdate].address = newEmail;
  await existingUser.save();
};


UserSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  if (this.uniqueId === "TBS" || this.uniqueId === undefined) {
    this.uniqueId = `DVUSER${Date.now()}`;
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
