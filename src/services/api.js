import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getStudyGroups() {
    return apiClient.get('/posts'); // Mock API for study groups
  },
  loginUser(user) {
    return apiClient.post('/users', user); // Mock API for login
  },
  registerUser(user) {
    return apiClient.post('/users', user); // Mock API for registration
  },
};
