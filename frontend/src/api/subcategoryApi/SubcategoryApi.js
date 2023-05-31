export const getSubCategoryByIdApi = (id) => {
  return `/category/all/subcategory/${id}`;
};

export const addSubCategoryByCategoryId = (id) => {
  return `/category/${id}/add`;
};

export const deleteSubCategoryById = (id) => {
  return `/category/subcategory/${id}`;
};
