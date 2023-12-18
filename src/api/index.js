import axios from 'axios';
const BASE_URL = 'https://congnito-server.onrender.com';

export const getData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api`);
    console.log(response, 'response');
  } catch (error) {
    return error;
  }
};

export const registerPostApi = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginPostApi = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutPostApi = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/logout`, formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyEmailPostApi = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/verifyEmail`, formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const verificationCodePostApi = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/verificationCode`,
      formData,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const childParentPermissionPostApi = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/child-parent-permissions`,
      formData,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const accountVerificationPostApi = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/account-verification`,
      formData,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const ForgotPasswordPostApi = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/forgotpassword`,
      formData,
    );
    return response;
  } catch (error) {
    return error;
  }
};
