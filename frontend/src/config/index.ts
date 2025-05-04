export const API_BASE_URL = import.meta.env.PROD
	? "/api"
	: "http://localhost:5000/api";

export const GOOGLE_MAPS_API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
export const STRIPE_PUBLIC_KEY = import.meta.env.PUBLIC_STRIPE_PUBLIC_KEY;
