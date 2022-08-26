import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  crimeTime: {
    type: String,
  },
  uid: {
    type: String,
  },
  mediaURL: [
    {
      type: String,
    },
  ],
  crimeType: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  score: {
    type: Number,
  },
  urgency: {
    type: String,
  },
});

export default mongoose.model("Alert", alertSchema);
