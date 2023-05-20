export const createPasswordResetTokenApi = (email) => {
  return `/password-reset-token?email=${email}`;
};

export const verifyPasswordResetTokenApi = (email) => {
  return `/password-reset-token/verify?email=${email}`;
};
