import apiRequest from "./apiService";

export const signUp = async (data) => {
  return await apiRequest("POST", "/user/signUp", data);
};

export const signIn = async (data) => {
  return await apiRequest("POST", "/user/signIn", data);
};

export const getProfile = async (data) => {
  return await apiRequest("GET", "/user/getProfile", data);
};

export const forgotPassword = async (data) => {
  return await apiRequest("POST", "/user/forgotPassword", data);
};

export const resetPassword = async (data) => {
  return await apiRequest("PUT", "/user/resetPassword", data);
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return await apiRequest("signInWithOAuth", "/user/signin/google");
};
