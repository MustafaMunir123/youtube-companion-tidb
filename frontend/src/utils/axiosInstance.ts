import { redirect } from 'next/navigation';

import { IRefreshToken } from '@/services/response.types';
import axios, { HeadersDefaults, AxiosRequestHeaders } from 'axios';

import {
  AI_SERVICE_PATH,
  API_BASE_URL,
  SEED_SERVICE_PATH,
  apiPath,
  publicApiEndpoints,
} from './api.endpoints';
import { publicRoutes } from './routes';

const axiosClient = axios.create({
  withCredentials: true,
});

axiosClient.defaults.baseURL = process.env.NODE_ENV === 'development' ? '' : API_BASE_URL;

const redirectToSignInPage = () => {
  localStorage.clear();
  let redirecttLink = '';
  if (window.location.href.indexOf('?doc_name') > -1) {
    redirecttLink = window.location.href;
    window.location.href =
      window.location.origin + publicRoutes.AUTH_SIGNIN + '?continue=' + redirecttLink;
  } else {
    window.location.href = window.location.origin + publicRoutes.AUTH_SIGNIN;
  }
};

interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
}

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as CustomAxiosRequestHeaders & HeadersDefaults;

export const userSignOutFn = async () => {
  await axiosClient
    .post(AI_SERVICE_PATH + apiPath.SIGN_OUT)
    .then(redirectToSignInPage)
    .catch(redirectToSignInPage)
    .finally(() => localStorage.clear());
};

export const refreshAccessTokenFn = async () => {
  const response = await axiosClient
    .get<IRefreshToken>(SEED_SERVICE_PATH + apiPath.RENEW_TOKEN)
    .catch(() => {
      // signout the currently logged in user
      userSignOutFn();
    });
  return response;
};

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = '/' + originalRequest.url.split('/').slice(-2).join('/');
    if (
      error.response.status === 401 &&
      !publicApiEndpoints.includes(requestUrl) &&
      !originalRequest._retry
    ) {
      // Currently not using refreshing technique, directly signing out
      await userSignOutFn();

      originalRequest._retry = true;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  },
);

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('token in axios::==', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { axiosClient };
