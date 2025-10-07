import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'signin', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(firstName, lastName, email, password) {
    return axios.post(API_URL + 'signup', null, {
      params: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  }

  registerManager(firstName, lastName, email, password) {
    return axios.post(API_URL + 'signup/manager', null, {
      params: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
}

export default new AuthService();
