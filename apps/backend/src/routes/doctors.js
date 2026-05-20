import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  getDoctorByUserId,
  updateDoctorProfile,
  addReview,
  getSpecializations,
} from "../controllers/doctorController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/specializations", getSpecializations);
router.get("/:id", getDoctorById);
router.get("/user/:userId", getDoctorByUserId);
router.patch("/profile", protect, restrictTo("doctor"), updateDoctorProfile);
router.post("/:id/reviews", protect, restrictTo("patient"), addReview);

export default router;
