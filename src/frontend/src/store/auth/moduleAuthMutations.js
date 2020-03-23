import axios from '../../http/axios/index';

export default {
  SET_BEARER(state, accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};
