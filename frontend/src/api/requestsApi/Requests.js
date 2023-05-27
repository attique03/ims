export const createRequests = '/requests';

export const getRequests = (type, userId) => {
  return `/requests?type=${type}&userId=${userId}`;
};

export const getRequestsById = (id) => {
  return `/requests/${id}`;
};

export const updateRequestsById = (id, status, returnType) => {
  return `/requests/${id}?status=${status}&returnType=${returnType}`;
};
