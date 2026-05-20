const catchAsync = require("../utils/catchAsync");
const { patientService, aiService } = require("../services");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const updatePatient = catchAsync(async (req, res) => {
  const patient = await patientService.updatePatient(req.params.id, req.body);
  res.status(httpStatus.OK).send(patient);
});

const askAi = catchAsync(async (req, res) => {
  const { input, pdfContent, context, conversationHistory } = req.body;

  if (!input || typeof input !== "string" || input.trim() === "") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Input is required and must be a non-empty string");
  }

  const text = await aiService.askPatientAi({
    input,
    pdfContent,
    context,
    conversationHistory,
  });

  res.status(httpStatus.OK).send({ text });
});

module.exports = {
  updatePatient,
  askAi,
};
