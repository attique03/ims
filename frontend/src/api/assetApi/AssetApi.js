export const createAssetApi = '/assets';

export const getAllAssets = (employeeId) => {
  return `/assets?employeeId=${employeeId}`;
};

export const getAssetApi = (id) => {
  return `/assets/${id}`;
};
