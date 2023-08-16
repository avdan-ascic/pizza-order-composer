import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  floor: {
    type: Number,
  },
});

export default mongoose.model("Address", AddressSchema);
