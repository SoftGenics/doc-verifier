import mongoose from "mongoose";
import validator from "validator";

const CertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  issuedBy: {
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      entity: {
        type: String,
        required: true,
        enum: ["company", "college", "user"]
      },
      name: {
        type: String,
        required: true,
      }
    },
    required: true,
  },
  autoVerified: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
  },
  // TODO: Remove this column...keeping this only for querying
  issuedToUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  issuedToUser: {
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
          }
        }
      },
      name: {
        type: String,
        required: true,
      }
    },
    required: true,
  },
  blockchainHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["verified", "rejected", "pending"]
  }
}, {
  timestamps: true
});


CertificateSchema.pre("save", async function(next) {
  if (this.uniqueId === "TBS" || this.uniqueId === undefined) {
    this.uniqueId = `DVCERT${Date.now()}`;
  }
  next();
});


const Certificate = mongoose.model("Certificate", CertificateSchema);


export default Certificate;
