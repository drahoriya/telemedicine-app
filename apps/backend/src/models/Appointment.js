import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    type: { type: String, enum: ["video", "chat"], default: "video" },
    reason: { type: String },
    notes: { type: String },
    prescription: { type: String },
    fee: { type: Number },
    paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
    meetingLink: { type: String },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
