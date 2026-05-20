const { Consultation } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createConsultation = async (body) => {
  return await Consultation.create(body);
};

const updateConsultation = async (id, body) => {
  const consultation = await Consultation.findByIdAndUpdate(id, body, { new: true }).exec();
  if (!consultation) {
    throw new ApiError(httpStatus.NOT_FOUND, "Consultation not found");
  }
  return consultation;
};

const getConsultation = async (id) => {
  const consultation = await Consultation.findById(id).exec();
  if (!consultation) {
    throw new ApiError(httpStatus.NOT_FOUND, "Consultation not found");
  }
  return consultation;
};

const getPatientConsultations = async (patientId) => {
  const consultations = await Consultation.find({ patient: patientId })
    .populate("doctor")
    .populate("patient")
    .exec();
  return consultations;
};

const getDoctorConsultations = async (doctorId) => {
  const consultations = await Consultation.find({ doctor: doctorId })
    .populate("doctor")
    .populate("patient")
    .exec();
  return consultations;
};

module.exports = {
  createConsultation,
  updateConsultation,
  getConsultation,
  getPatientConsultations,
  getDoctorConsultations,
};
