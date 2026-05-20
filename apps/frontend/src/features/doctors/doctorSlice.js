import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchDoctors = createAsyncThunk("doctors/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/doctors", { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch doctors");
  }
});

export const fetchDoctorById = createAsyncThunk("doctors/fetchById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/doctors/${id}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Doctor not found");
  }
});

export const fetchSpecializations = createAsyncThunk("doctors/fetchSpecializations", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/doctors/specializations");
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateDoctorProfile = createAsyncThunk("doctors/updateProfile", async (updates, { rejectWithValue }) => {
  try {
    const { data } = await api.patch("/doctors/profile", updates);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Update failed");
  }
});

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    selectedDoctor: null,
    specializations: [],
    total: 0,
    pages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedDoctor: (state, action) => { state.selectedDoctor = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => { state.isLoading = true; })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload.doctors;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
      })
      .addCase(fetchDoctors.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(fetchDoctorById.pending, (state) => { state.isLoading = true; })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDoctor = action.payload.doctor;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.specializations = action.payload.specializations;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.selectedDoctor = action.payload.doctor;
      });
  },
});

export const { setSelectedDoctor, clearError } = doctorSlice.actions;
export default doctorSlice.reducer;
