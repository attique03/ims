export const createUserApi = (email) => {
  return `/user?email=${email}`;
};
export const loginApi = '/user/login';
export const getUsersApi = (organizationId) => {
  return `/user?organizationId=${organizationId}`;
  // `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
};
