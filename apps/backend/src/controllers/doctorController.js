import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

export const getAllDoctors = async (req, res) => {
  try {
    const { specialization, search, page = 1, limit = 10 } = req.query;

    const query = {};
    if (specialization) query.specialization = { $regex: specialization, $options: "i" };

    let doctors = await Doctor.find(query)
      .populate("user", "firstName lastName email profileImage")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ rating: -1 });

    if (search) {
      doctors = doctors.filter((d) => {
        const fullName = `${d.user.firstName} ${d.user.lastName}`.toLowerCase();
        return fullName.includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
      });
    }

    const total = await Doctor.countDocuments(query);
    res.json({ doctors, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("user", "firstName lastName email profileImage phone")
      .populate("reviews.patient", "firstName lastName profileImage");

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.params.userId })
      .populate("user", "firstName lastName email profileImage phone")
      .populate("reviews.patient", "firstName lastName profileImage");

    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const allowedFields = ["specialization", "qualifications", "experience", "bio", "consultationFee", "availability", "languages", "hospital"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const doctor = await Doctor.findOneAndUpdate({ user: req.user._id }, updates, { new: true, runValidators: true }).populate("user", "firstName lastName email profileImage");

    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const existingReview = doctor.reviews.find((r) => r.patient.toString() === req.user._id.toString());
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      doctor.reviews.push({ patient: req.user._id, rating, comment });
    }

    doctor.updateRating();
    await doctor.save();
    res.json({ message: "Review added", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpecializations = async (req, res) => {
  try {
    const specializations = await Doctor.distinct("specialization");
    res.json({ specializations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
