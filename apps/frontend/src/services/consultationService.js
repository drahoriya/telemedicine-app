import axios from "axios";

export const createConsultation = async ({ date, patient, doctor }) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/consultation`,
    { date, patient, doctor },
  );

export const updateConsultation = async (id, token, body) =>
  await axios.patch(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/consultation/${id}`,
    body,
    {
      headers: {
        authtoken: token,
      },
    },
  );

export const getConsultation = async (id) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_V1_URL}/consultation/${id}`);

export const getDoctorConsultations = async (doctorId) =>
  await axios.get(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/consultation/doctor/${doctorId}`,
  );

export const getPatientConsultations = async (patientId) =>
  await axios.get(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/consultation/patient/${patientId}`,
  );
