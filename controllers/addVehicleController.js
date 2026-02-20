import AddVehicle from "../models/AddVehicle.js";

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await AddVehicle.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await AddVehicle.findById(req.params.id);
    if (!vehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new vehicle
export const createVehicle = async (req, res) => {
  try {
    const { type, name } = req.body;
    if (!type || !name)
      return res
        .status(400)
        .json({ success: false, message: "Type and name are required" });

    const newVehicle = await AddVehicle.create({ type, name });
    res.status(201).json({ success: true, data: newVehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update vehicle by ID
export const updateVehicle = async (req, res) => {
  try {
    const { type, name } = req.body;
    const vehicle = await AddVehicle.findById(req.params.id);

    if (!vehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    if (type) vehicle.type = type;
    if (name) vehicle.name = name;

    await vehicle.save();
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete vehicle by ID
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await AddVehicle.findByIdAndDelete(req.params.id);
    if (!vehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    res
      .status(200)
      .json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
