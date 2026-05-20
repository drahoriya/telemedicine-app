import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
  startTime: { type: String },
  endTime: { type: String },
  isAvailable: { type: Boolean, default: true },
});

const reviewSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialization: { type: String, required: true },
    qualifications: [{ type: String }],
    experience: { type: Number, default: 0 },
    bio: { type: String },
    consultationFee: { type: Number, required: true, default: 50 },
    availability: [availabilitySchema],
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: true },
    languages: [{ type: String }],
    hospital: { type: String },
  },
  { timestamps: true }
);

doctorSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.totalReviews = 0;
  } else {
    const total = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.rating = parseFloat((total / this.reviews.length).toFixed(1));
    this.totalReviews = this.reviews.length;
  }
};

export default mongoose.model("Doctor", doctorSchema);
