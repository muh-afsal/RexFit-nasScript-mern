import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

export const getAccessToken = () => {
  const token = Cookies.get('accessToken');
  
  return token;
};

// Decode the access token
export const decodeAccessToken = () => {
  const token = getAccessToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  return null;
};

// Check if the token has expired
export const isTokenExpired = () => {
  const decodedToken = decodeAccessToken();
  if (decodedToken) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }
  return true;
};

// Set the access token in cookies
export const setAccessToken = (token) => {
  Cookies.set('accessToken', token, { 
    expires: 1, 
    secure: true,
    sameSite: 'strict'
  });
};

// Remove the access token from cookies
export const removeAccessToken = () => {
  Cookies.remove('accessToken');
};
