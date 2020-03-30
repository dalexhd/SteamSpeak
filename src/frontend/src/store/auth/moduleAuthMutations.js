import backend from '@/http/axios/index';

export default {
  SET_BEARER(state, accessToken) {
    backend.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};
