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

export const VerifyOtp = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/verifyOTP`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ForgotPassword = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/forgot-password`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ChangePassword = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/reset-password`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ResendOtp = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/resend-otp`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
