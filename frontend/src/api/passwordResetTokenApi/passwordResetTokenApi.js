export const createPasswordResetTokenApi = (email) => {
  return `/password-reset-token?email=${email}`;
};
