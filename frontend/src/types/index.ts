export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'customer' | 'provider' | 'admin';
    phone?: string;
    profileImage?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  }
  
  export interface Provider {
    _id: string;
    user: User;
    businessName?: string;
    description?: string;
    services: string[];
    averageRating: number;
    totalReviews: number;
    verified: boolean;
  }
  
  export interface Service {
    _id: string;
    title: string;
    description: string;
    provider: Provider;
    category: Category;
    price: number;
    pricingUnit: 'hourly' | 'fixed' | 'per day';
    images: string[];
    averageRating: number;
    totalReviews: number;
    isAvailable: boolean;
  }
  
  export interface Category {
    _id: string;
    name: string;
    description?: string;
    icon?: string;
  }
  
  export interface Booking {
    _id: string;
    customer: User;
    service: Service;
    provider: Provider;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    scheduledDate: Date;
    scheduledTime: {
      start: string;
      end?: string;
    };
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
    price: number;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    paymentMethod?: string;
    notes?: string;
  }
  
  export interface Review {
    _id: string;
    booking: string;
    customer: User;
    provider: Provider;
    service: Service;
    rating: number;
    comment?: string;
    images?: string[];
    reply?: {
      text: string;
      date: Date;
    };
  }
  
  export interface Chat {
    _id: string;
    participants: User[];
    booking?: Booking;
    lastMessage?: {
      text: string;
      sender: User;
      timestamp: Date;
    };
  }
  
  export interface Message {
    _id: string;
    chat: string;
    sender: User;
    text: string;
    attachments?: string[];
    readBy: {
      user: User;
      readAt: Date;
    }[];
  }