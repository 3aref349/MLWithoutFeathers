import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  contact: null,
  contacts: [],
  loading: false,
  loadingContact: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getcontacts = createAsyncThunk(
  "contacts/getcontacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact/default");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



// ─── Crete a  contact ──────────────────────────────────────────────────────────────────────


export const createContact = createAsyncThunk(
  "contacts/createcontact",
  async (
    { contactName, email, phoneNo,homeNo },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        contactName,
        email,
        phoneNo,
        homeNo

      };
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    resetContact(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getarticles ───────────────────────────────────────────────────────
    //
    [getcontacts.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getcontacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getcontacts.rejected]: (state, action) => {
      state.contacts = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createContact.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createContact.fulfilled]: (state, action) => {
      state.contacts = action.payload.contacts;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createContact.rejected]: (state, action) => {

      state.loading = false;
      state.errors = action.payload;
    },


 
  },
});
export const { resetContact } = contactSlice.actions
export default contactSlice.reducer;
