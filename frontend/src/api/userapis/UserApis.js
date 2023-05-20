export const loginApi = '/user/login';
export const createUserApi = (email) => {
  return `/user?email=${email}`;
};
export const getUsersApi = (organizationId) => {
  return `/user?organizationId=${organizationId}`;
};
export const getUserApi = (id) => {
  return `/user/${id}`;
};
export const resetPasswordUserApi = (email) => {
  return `/user/resetPassword?email=${email}`;
};
