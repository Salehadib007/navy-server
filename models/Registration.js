import mongoose from "mongoose";

// Each Registration document will have one location and one unit
const RegistrationSchema = new mongoose.Schema(
  {
    location: {
      type: [String],

      trim: true,
    },
    unit: {
      type: [String],

      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false, // Optional: remove __v field
  },
);

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;
