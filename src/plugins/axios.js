"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from 'qs'

//Vue.prototype.$axios = axios
//Vue.prototype.$qs = qs;

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
//自定义配置新建一个 axios 实例 为_axios
const _axios = axios.create(config);

// 添加请求拦截器  
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 添加响应拦截器
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

Vue.use(Plugin)

export default Plugin;
