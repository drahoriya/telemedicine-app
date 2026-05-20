import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, type, reason } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const conflict = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (conflict) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      type: type || "video",
      reason,
      fee: doctor.consultationFee,
    });

    await appointment.populate([
      { path: "patient", select: "firstName lastName email profileImage" },
      { path: "doctor", populate: { path: "user", select: "firstName lastName email profileImage" } },
    ]);

    res.status(201).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { patient: req.user._id };
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate({ path: "doctor", populate: { path: "user", select: "firstName lastName email profileImage" } })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(query);
    res.json({ appointments, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });

    const query = { doctor: doctor._id };
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate("patient", "firstName lastName email profileImage phone dateOfBirth gender")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(query);
    res.json({ appointments, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "firstName lastName email profileImage phone")
      .populate({ path: "doctor", populate: { path: "user", select: "firstName lastName email profileImage" } });

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes, prescription, meetingLink } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, notes, prescription, meetingLink },
      { new: true }
    ).populate("patient", "firstName lastName email");

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user._id,
      status: { $in: ["pending", "confirmed"] },
    });

    if (!appointment) return res.status(404).json({ message: "Appointment not found or cannot be cancelled" });

    appointment.status = "cancelled";
    await appointment.save();
    res.json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
