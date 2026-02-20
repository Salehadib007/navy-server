import Registration from "../models/Registration.js";

// ================= GET all registrations =================
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADD a new location or unit =================
export const addRegistration = async (req, res) => {
  try {
    const { location, unit } = req.body;

    // Validate input
    if ((!location || location.length === 0) && (!unit || unit.length === 0)) {
      return res.status(400).json({ message: "Provide location or unit" });
    }

    // Create new registration document
    const registration = new Registration({
      location: location || [],
      unit: unit || [],
    });

    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE a specific registration =================
export const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, unit } = req.body;

    const registration = await Registration.findById(id);
    if (!registration) return res.status(404).json({ message: "Not found" });

    // Update arrays if provided
    if (location) registration.location = location;
    if (unit) registration.unit = unit;

    await registration.save();
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE an entire registration document =================
export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByIdAndDelete(id);
    if (!registration) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADD a single item to location or unit array =================
export const addItemToRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, value } = req.body; // type: 'location' or 'unit'

    if (!type || !value) {
      return res.status(400).json({ message: "Provide type and value" });
    }

    const registration = await Registration.findById(id);
    if (!registration) return res.status(404).json({ message: "Not found" });

    if (type === "location") registration.location.push(value);
    else if (type === "unit") registration.unit.push(value);
    else return res.status(400).json({ message: "Invalid type" });

    await registration.save();
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE a single item from location or unit array =================
export const deleteItemFromRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, value } = req.body; // type: 'location' or 'unit'

    if (!type || !value) {
      return res.status(400).json({ message: "Provide type and value" });
    }

    const registration = await Registration.findById(id);
    if (!registration) return res.status(404).json({ message: "Not found" });

    if (type === "location")
      registration.location = registration.location.filter(
        (item) => item !== value,
      );
    else if (type === "unit")
      registration.unit = registration.unit.filter((item) => item !== value);
    else return res.status(400).json({ message: "Invalid type" });

    await registration.save();
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
