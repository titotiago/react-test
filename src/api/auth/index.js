export const loginWithEmailAndPassword = (data) => {
    return window.FakerApi.post('/login', data).catch((response) => response);
  };
  
export const registerWithEmailAndPassword = (data)  => {
  return window.FakerApi.post('/register', data).catch((response) => response);
};

export const getUserProfile = () => {
  return window.FakerApi.get('/me').catch((response) => response);
};

export const logout = () => {
  return window.FakerApi.post('/logout', {}).catch((response) => response);
}