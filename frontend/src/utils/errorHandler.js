export const errorHandler = (error) => {
  return error?.response?.data ? error.response.data.errors : error.message;
};
