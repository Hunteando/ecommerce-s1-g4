import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_URL = "http://localhost:3001/user/register";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log("respuesta axios");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
