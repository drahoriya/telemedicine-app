export const authErrorMessage = (error) => {
  if (error?.code === "ECONNABORTED" || error?.message?.includes("timeout")) {
    return "Server is waking up, please try again in 30 seconds.";
  }
  if (
    error?.code === "auth/invalid-login-credentials" ||
    error?.code === "auth/wrong-password" ||
    error?.code === "auth/user-not-found"
  ) {
    return "Invalid email or password.";
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
};
