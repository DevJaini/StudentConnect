import apiRequest from "./apiService";

// Sign in with email and password
export const signIn = async (email, password) => {
  return await apiRequest("signIn", "/user/signin", { email, password });
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return await apiRequest("signInWithOAuth", "/user/signin/google");
};

// Sign out
export const signUp = async (username, email, password) => {
  return await apiRequest("signOut", "/user/signout", {
    username,
    email,
    password,
  });
};
