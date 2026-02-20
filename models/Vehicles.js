import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true, // 🔴 Important: only one doc per type
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// 🔹 Atomic Increment per specific type
vehicleSchema.statics.addVehicle = async function (type) {
  return await this.findOneAndUpdate(
    { type },
    { $inc: { count: 1 } }, // ✅ increments only this type
    {
      new: true,
      upsert: true, // create if not exists
      runValidators: true,
    },
  );
};

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
