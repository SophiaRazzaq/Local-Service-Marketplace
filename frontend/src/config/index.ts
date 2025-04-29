export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:5000/api';

export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;