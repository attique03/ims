export const createComplaintApi = '/complaints';

export const getComplaintsApi = (employees) => {
  return `/complaints?employees=${employees}`;
};

export const getComplaintApi = (id) => {
  return `/complaints/${id}`;
};
