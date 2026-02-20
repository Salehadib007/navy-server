import express from "express";
import {
  getRegistrations,
  addRegistration,
  updateRegistration,
  deleteRegistration,
  addItemToRegistration,
  deleteItemFromRegistration,
} from "../controllers/registrationController.js";

const router = express.Router();

// ================= GET all registrations =================
router.get("/", getRegistrations);

// ================= CREATE a new registration =================
router.post("/", addRegistration);

// ================= UPDATE entire registration (replace arrays) =================
router.put("/:id", updateRegistration);

// ================= DELETE entire registration document =================
router.delete("/:id", deleteRegistration);

// ================= ADD a single location/unit to array =================
router.patch("/:id/add", addItemToRegistration);

// ================= DELETE a single location/unit from array =================
router.patch("/:id/remove", deleteItemFromRegistration);

export default router;
