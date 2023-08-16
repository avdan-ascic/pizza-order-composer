import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  ingredients: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", OrderSchema);
