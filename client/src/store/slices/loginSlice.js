import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../services/authService';

const STORAGE_KEY = 'login_user';

const getPersistedUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const persistedUser = getPersistedUser();

const initialState = {
  form: {
    email: '',
    password: '',
  },
  loading: false,
  successMessage: '',
  errorMessage: '',
  user: persistedUser,
  isAuthenticated: Boolean(persistedUser),
};

const extractError = (error) => {
  const errors = error?.response?.data?.errors;
  if (Array.isArray(errors) && errors.length) return errors[0].msg;
  return error?.response?.data?.message || 'C\u00F3 l\u1ED7i x\u1EA3y ra, vui l\u00F2ng th\u1EED l\u1EA1i.';
};

export const loginThunk = createAsyncThunk(
  'login/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { email, password } = getState().login.form;
      const response = await loginUser(email.trim(), password);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    clearLoginMessages: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
    resetLoginState: () => {
      localStorage.removeItem(STORAGE_KEY);
      return {
        ...initialState,
        user: null,
        isAuthenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || '\u0110\u0103ng nh\u1EADp th\u00E0nh c\u00F4ng.';
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        if (action.payload.user) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || '\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i.';
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem(STORAGE_KEY);
      });
  },
});

export const { setLoginField, clearLoginMessages, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
