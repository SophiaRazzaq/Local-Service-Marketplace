import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, register, getProfile, setAuthToken } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          setAuthToken(storedToken);
          const userData = await getProfile();
          setUser(userData);
          setToken(storedToken);
        } catch (err) {
          localStorage.removeItem('token');
          setAuthToken('');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { token, user } = await login({ email, password });
      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(user);
      setToken(token);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string, role: string) => {
    try {
      setLoading(true);
      const { token, user } = await register({ name, email, password, role });
      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(user);
      setToken(token);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken('');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);