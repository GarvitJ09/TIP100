import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  media: [
    {type: String},
  ],
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  urgency: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  suspect: {
    type: String,
  },
  tip_score:{
    type: Number,
  },
  user_id:{
    type: String,
  }

});

export default mongoose.model("Tip", tipSchema);
