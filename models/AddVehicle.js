import mongoose from "mongoose";

const addVehicleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Vehicle type is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Vehicle name/model is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const AddVehicle =
  mongoose.models.AddVehicle || mongoose.model("AddVehicle", addVehicleSchema);

export default AddVehicle;
