import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        // Fetch user data from backend
        const response = await api.get('/api/v1/users/me');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // If token is invalid, clear it
      await SecureStore.deleteItemAsync('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('[Auth] Attempting login...');
      // Call backend login endpoint
      const response = await api.post('/api/v1/auth/login', { email, password });
      const { access_token } = response.data;

      // Store token
      await SecureStore.setItemAsync('authToken', access_token);

      // Fetch user data
      const userResponse = await api.get('/api/v1/users/me');
      setUser(userResponse.data);

      console.log('[Auth] Login successful');
      return { success: true };
    } catch (error: any) {
      console.error('[Auth] Login error:', error);
      let message = 'Erro ao fazer login';

      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        message = 'Erro de conexão. Verifique se o backend está rodando.';
      } else if (error.response?.data?.detail) {
        message = error.response.data.detail;
      }

      return { success: false, error: message };
    }
  };

  const register = async (data: { name: string; email: string; password: string; cpf?: string; phone?: string }) => {
    try {
      console.log('[Auth] Attempting registration...');
      // Call backend register endpoint
      await api.post('/api/v1/auth/register', data);
      // Backend doesn't auto-login, so user needs to login after registration
      console.log('[Auth] Registration successful');
      return { success: true };
    } catch (error: any) {
      console.error('[Auth] Register error:', error);
      let message = 'Erro ao criar conta';

      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        message = 'Erro de conexão. Verifique se o backend está rodando.';
      } else if (error.response?.data?.detail) {
        message = error.response.data.detail;
      }

      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
