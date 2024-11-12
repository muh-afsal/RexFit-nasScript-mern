import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const CLIENT_API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Signup Action
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post('/auth/signup', userData);
      console.log(response.data,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Signup failed'
      );
    }
  }
);

// Login Action
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post('/auth/signin', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Logout Action
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await CLIENT_API.post('/auth/logout');
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

// Fetch User Action
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_,{ rejectWithValue }) => {
    
    try {
      const response = await CLIENT_API.post('/auth/fetchUser');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

// Google Login Action
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (googleCredentials, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post('/auth/google-login', googleCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Google login failed'
      );
    }
  }
);

export { CLIENT_API };