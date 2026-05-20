import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
} from "../controllers/appointmentController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", restrictTo("patient"), createAppointment);
router.get("/my", restrictTo("patient"), getMyAppointments);
router.get("/doctor", restrictTo("doctor"), getDoctorAppointments);
router.get("/:id", getAppointmentById);
router.patch("/:id/status", restrictTo("doctor"), updateAppointmentStatus);
router.patch("/:id/cancel", restrictTo("patient"), cancelAppointment);

export default router;
