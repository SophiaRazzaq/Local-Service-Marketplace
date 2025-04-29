import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Booking, Category, Chat, Message, Provider, Review, Service, User } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Set auth token
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth services
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// User services
export const updateProfile = async (userData: Partial<User>) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

// Service services
export const getServices = async (params?: {
  keyword?: string;
  category?: string;
  page?: number;
}) => {
  const response = await api.get('/services', { params });
  return response.data;
};

export const getServiceById = async (id: string) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const createService = async (serviceData: Partial<Service>) => {
  const response = await api.post('/services', serviceData);
  return response.data;
};

// Booking services
export const createBooking = async (bookingData: Partial<Booking>) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

// Review services
export const createReview = async (reviewData: Partial<Review>) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const getProviderReviews = async (providerId: string) => {
  const response = await api.get(`/reviews/provider/${providerId}`);
  return response.data;
};

// Chat services
export const getChats = async () => {
  const response = await api.get('/messages/chats');
  return response.data;
};

export const getMessages = async (chatId: string) => {
  const response = await api.get(`/messages/${chatId}`);
  return response.data;
};

export const sendMessage = async (messageData: Partial<Message>) => {
  const response = await api.post('/messages', messageData);
  return response.data;
};

// Payment services
export const createPaymentIntent = async (bookingId: string) => {
  const response = await api.post('/payments/create-payment-intent', { bookingId });
  return response.data;
};

export const updatePaymentStatus = async (bookingId: string, status: string, method: string) => {
  const response = await api.put(`/payments/update-status/${bookingId}`, {
    paymentStatus: status,
    paymentMethod: method,
  });
  return response.data;
};

export default api;