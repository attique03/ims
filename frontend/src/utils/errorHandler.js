export const errorHandler = (error) => {
  return error?.response?.data ? error.response.data.message : error.message;
};
