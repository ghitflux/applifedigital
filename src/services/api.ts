import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Get API URL from config or use platform-specific defaults
const getApiUrl = () => {
  // Debug: log what Constants contains
  console.log('[API] Constants.expoConfig?.extra:', Constants.expoConfig?.extra);
  console.log('[API] Constants.manifest?.extra:', Constants.manifest?.extra);
  console.log('[API] Constants.manifest2?.extra:', Constants.manifest2?.extra);

  // Try expoConfig.extra first (Expo SDK 46+)
  if (Constants.expoConfig?.extra?.apiUrl) {
    console.log('[API] Using expoConfig.extra.apiUrl');
    return Constants.expoConfig.extra.apiUrl;
  }

  // Try manifest.extra (older Expo versions)
  if (Constants.manifest?.extra?.apiUrl) {
    console.log('[API] Using manifest.extra.apiUrl');
    return Constants.manifest.extra.apiUrl;
  }

  // Try manifest2.extra (Expo Go)
  if (Constants.manifest2?.extra?.expoClient?.extra?.apiUrl) {
    console.log('[API] Using manifest2.extra.expoClient.extra.apiUrl');
    return Constants.manifest2.extra.expoClient.extra.apiUrl;
  }

  // Platform-specific defaults for development
  if (__DEV__) {
    console.log('[API] Using platform-specific default');

    // Try to get the local network IP from Expo's debugger host
    const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift()
      || Constants.manifest?.debuggerHost?.split(':').shift();

    if (debuggerHost) {
      console.log(`[API] Found debugger host: ${debuggerHost}`);
      return `http://${debuggerHost}:8000`;
    }

    // Fallback for Android - use local network IP
    if (Platform.OS === 'android') {
      // For physical device, use the local network IP
      return 'http://192.168.3.8:8000';
    }

    // Fallback for iOS simulator
    return 'http://localhost:8000';
  }

  // Production fallback (should be set via environment variable)
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();

// Log final API URL for debugging
console.log(`[API] Using API URL: ${API_URL} (Platform: ${Platform.OS}, Dev: ${__DEV__})`);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
  async (config) => {
    console.log(`[API] Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API] Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle unauthorized errors
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response received: ${response.status} ${response.statusText}`);
    return response;
  },
  async (error) => {
    console.error('[API] Response error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      }
    });

    if (error.response?.status === 401) {
      // Clear token on unauthorized
      await SecureStore.deleteItemAsync('authToken');
      // Note: The useAuth hook will handle navigation to login
    }
    return Promise.reject(error);
  }
);

export default api;
