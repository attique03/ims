export const createCategoryApi = '/category';
export const getAllCategoriesApi = '/category/all';
export const getCategoryByIdApi = (id) => {
  return `/category/all/${id}`;
};

export const getIndividualCategory = (id) => {
  return `/category/individual/${id}`;
};

export const UDCategoryById = (id) => {
  return `/category/${id}`;
};
