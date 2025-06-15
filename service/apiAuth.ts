import { baseUrl } from '@/config/api';
import axios from 'axios';

export const Login = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/login`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const Register = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/register`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
