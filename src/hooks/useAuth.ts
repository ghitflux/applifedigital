import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

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
        // TODO: Validate token and load user data
        // For now, just set a dummy user
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement API call
      // const response = await api.post('/auth/login', { email, password });
      // await SecureStore.setItemAsync('authToken', response.data.token);
      // setUser(response.data.user);

      // Dummy implementation
      const dummyUser = { id: '1', email, name: 'Usuário Teste' };
      setUser(dummyUser);
      await SecureStore.setItemAsync('authToken', 'dummy-token');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // TODO: Implement API call
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Erro ao criar conta' };
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
