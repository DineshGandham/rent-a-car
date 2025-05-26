// src/redux/auth/authAPI.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/auth',
});

export const registerUserAPI = async (userData: any) => {
  const response = await API.post('/register', userData);
  return response.data;
};

export const loginUserAPI = async (userData: any) => {
  const response = await API.post('/login', userData);
  return response.data;
};


export const forgotPassApi = async (userData:any) => {
  const response = await API.post('/forgotPassword', userData);
  return response.data;
}