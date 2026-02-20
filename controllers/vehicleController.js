import Vehicle from "../models/Vehicles.js";

/**
 * @desc    Add vehicle (increment count of specific type)
 * @route   POST /api/vehicles
 */
export const addVehicle = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Vehicle type is required",
      });
    }

    const vehicle = await Vehicle.addVehicle(type);

    return res.status(200).json({
      success: true,
      message: `${type} count increased successfully`,
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all vehicle types with counts
 * @route   GET /api/vehicles
 */
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ type: 1 });

    return res.status(200).json({
      success: true,
      totalTypes: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get vehicle type by ID
 * @route   GET /api/vehicles/:id
 */
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle type not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update vehicle type manually (rarely needed)
 * @route   PUT /api/vehicles/:id
 */
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle type not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete vehicle type
 * @route   DELETE /api/vehicles/:id
 */
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle type not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle type deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
