"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from 'qs'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs;

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://api.sweet.com/api'
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control

  //baseURL: 'http://api.sweet.com',
  api: '${baseURL}/api'
};
//api: '${baseURL}/api'

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        options.get;//Todo 获取数据操作
        return _axios;
      }
    },
    $axios: {
      get () {
        return _axios;
      }
    },
  });
};

// Vue.use(Plugin)

// export default Plugin;
