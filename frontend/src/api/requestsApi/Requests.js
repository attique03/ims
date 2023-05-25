export const createRequests = '/requests';

export const getRequests = (type) => {
  return `/requests?type=${type}`;
};

export const getRequestsById = (id) => {
  return `/requests/${id}`;
};

export const updateRequestsById = (id, status, returnType) => {
  return `/requests/${id}?status=${status}&returnType=${returnType}`;
};
