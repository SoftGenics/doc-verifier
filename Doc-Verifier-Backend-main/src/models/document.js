import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  bucketPath: {
    type: String,
    required: true,
  },
  urlLastUpdatedAt: {
    type: Date,
    required: true,
  },
  urlExpiry: {
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  timestamps: true
});


const Document = mongoose.model("Document", DocumentSchema);

export default Document;
