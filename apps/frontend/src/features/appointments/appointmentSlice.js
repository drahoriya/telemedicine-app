import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMyAppointments = createAsyncThunk("appointments/fetchMy", async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/appointments/my", { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch appointments");
  }
});

export const fetchDoctorAppointments = createAsyncThunk("appointments/fetchDoctor", async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/appointments/doctor", { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch appointments");
  }
});

export const createAppointment = createAsyncThunk("appointments/create", async (appointmentData, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/appointments", appointmentData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create appointment");
  }
});

export const updateAppointment = createAsyncThunk("appointments/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/appointments/${id}/status`, updates);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to update appointment");
  }
});

export const cancelAppointment = createAsyncThunk("appointments/cancel", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/appointments/${id}/cancel`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to cancel appointment");
  }
});

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    total: 0,
    isLoading: false,
    error: null,
    selectedAppointment: null,
  },
  reducers: {
    setSelectedAppointment: (state, action) => { state.selectedAppointment = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAppointments.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload.appointments;
        state.total = action.payload.total;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(fetchDoctorAppointments.pending, (state) => { state.isLoading = true; })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload.appointments;
        state.total = action.payload.total;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.unshift(action.payload.appointment);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const idx = state.appointments.findIndex((a) => a._id === action.payload.appointment._id);
        if (idx !== -1) state.appointments[idx] = action.payload.appointment;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const idx = state.appointments.findIndex((a) => a._id === action.payload.appointment._id);
        if (idx !== -1) state.appointments[idx] = action.payload.appointment;
      });
  },
});

export const { setSelectedAppointment, clearError } = appointmentSlice.actions;
export default appointmentSlice.reducer;
