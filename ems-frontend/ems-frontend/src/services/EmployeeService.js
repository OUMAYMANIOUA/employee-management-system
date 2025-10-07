import axios from 'axios';
import AuthService from './AuthService';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

const authHeader = () => {
  return AuthService.getAuthHeader();
};

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL, { headers: authHeader() });
};

export const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, employee, { headers: authHeader() });
};

export const getEmployee = (employeeId) => {
  return axios.get(REST_API_BASE_URL + '/' + employeeId, { headers: authHeader() });
};

export const updateEmployee = (employeeId, employee) => {
  return axios.put(REST_API_BASE_URL + '/' + employeeId, employee, { headers: authHeader() });
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(REST_API_BASE_URL + '/' + employeeId, { headers: authHeader() });
};