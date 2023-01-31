const tokenKey = import.meta.env.REACT_APP_TOKEN_KEY;

export function setAuthHeadersOnRequest(config) {
  try {
    const token = JSON.parse(localStorage.getItem(tokenKey));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
}

export function removeTokenFromStorageIfUnauthorizedResponse(error) {
  try {
    if (error.response?.status === 401) {
      localStorage.removeItem(tokenKey);
    }
    return Promise.reject(error);
  } catch (error) {
    return Promise.reject(error);
  }
}

export function clearToken() {
  return new Promise((resolve) => resolve(localStorage.removeItem(tokenKey)));
}
