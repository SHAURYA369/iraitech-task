import axios from "axios";

const TOKEN_KEY = "jwtToken";

const parse = JSON.parse;
const stringify = JSON.stringify;

const clear = (key) => {
  if (localStorage && localStorage.getItem(key)) {
    return localStorage.removeItem(key);
  }

  if (sessionStorage && sessionStorage.getItem(key)) {
    return sessionStorage.removeItem(key);
  }

  return null;
};

const clearToken = (tokenKey = TOKEN_KEY) => {
  return clear(tokenKey);
};

/**
 * Returns data from storage
 * @param  {String} key Item to get from the storage
 * @return {String|Object}     Data from the storage
 */
const get = (key) => {
  if (localStorage && localStorage.getItem(key)) {
    return parse(localStorage.getItem(key)) || null;
  }

  if (sessionStorage && sessionStorage.getItem(key)) {
    return parse(sessionStorage.getItem(key)) || null;
  }

  return null;
};

const getToken = (tokenKey = TOKEN_KEY) => {
  return get(tokenKey);
};

/**
 * Set data in storage
 * @param {String|Object}  value    The data to store
 * @param {String}  key
 * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
 */
const set = (value, key, isLocalStorage) => {
  //   console.log(
  //     `[auth] value: ${value}, key: ${key}, isLocal: ${isLocalStorage}`
  //   );

  if (!value) {
    return null;
  }

  if (isLocalStorage && localStorage) {
    return localStorage.setItem(key, stringify(value));
  }

  if (sessionStorage) {
    return sessionStorage.setItem(key, stringify(value));
  }

  return null;
};

const setToken = (value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) => {
  setAuthToken(value);
  return set(value, tokenKey, isLocalStorage);
};

// setting token in headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default { setToken, getToken, clearToken };
