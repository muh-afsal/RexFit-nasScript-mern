import { createSlice } from '@reduxjs/toolkit';
import { 
  signupUser, 
  loginUser, 
  fetchUser, 
  googleLogin 
} from '../actions/authActions.js';

export const UserRoles = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
  MEMBER: 'member'
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Synchronous reducers
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
    },
    setCredentials: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    // Signup Reducers
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signupUser.fulfilled, (state, action) => {
        console.log(action,'actoin from the signup user999999999999999');
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
    })
    .addCase(signupUser.rejected, (state, action) => {
        
      state.isLoading = false;
      state.error = action.payload || 'Signup failed';
      state.isAuthenticated = false;
    })

    // Login Reducers
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Login failed';
      state.isAuthenticated = false;
    })

    // Google Login Reducers
    .addCase(googleLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(googleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
    })
    .addCase(googleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Google login failed';
      state.isAuthenticated = false;
    })

    // Fetch User Reducers
    .addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = action.payload || 'Failed to fetch user';
    });
  }
});

export const { 
  logout, 
  resetError, 
  setCredentials 
} = userSlice.actions;

export default userSlice.reducer;

// Selector functions
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserRole = (state) => state.user.role;
export const selectUser = (state) => state.user.user;
export const selectUserError = (state) => state.user.error;
export const selectAuthState = (state) => state.user;