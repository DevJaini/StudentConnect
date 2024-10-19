import apiRequest from "./apiService";

// Sign in with email and password
export const signIn = async (data) => {
  return await apiRequest("POST", "/user/signin", data);
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return await apiRequest("signInWithOAuth", "/user/signin/google");
};

// Sign out
export const signUp = async (data) => {
  return await apiRequest("signOut", "/user/signout", data);
};
