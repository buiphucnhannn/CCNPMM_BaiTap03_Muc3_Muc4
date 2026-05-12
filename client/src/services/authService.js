import apiClient from '../lib/apiClient';

export const loginUser = (email, password) =>
  apiClient.post('/auth/login', { email, password });
