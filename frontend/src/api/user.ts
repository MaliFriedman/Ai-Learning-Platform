import axiosInstance from "../utils/axiosConfig";

const API_URL = '/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const registerUser = async (userData: { id: string; name: string; phone: string }) => {
  const res = await axiosInstance.post(`${API_URL}/register`, userData);
  return res.data;
};

export const loginUser = async (data: { name: string; phone: string }) => {
  const res = await axiosInstance.post(`${API_URL}/login`, data);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axiosInstance.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axiosInstance.get(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, data, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
