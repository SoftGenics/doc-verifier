import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  candidateDetails: {
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      uniqueId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    }
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  certificates: [{
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["verified", "rejected", "pending"]
      }
    }
  }],
  appliedFor: {
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["accepted", "rejected", "pending"]
  }
}, {
  timestamps: true
});


ApplicationSchema.pre("save", async function(next) {
  if (this.uniqueId === "TBS" || this.uniqueId === undefined) {
    this.uniqueId = `DVAPPL${Date.now()}`;
  }
  next();
});



const Application = mongoose.model("Application", ApplicationSchema);


export default Application;
