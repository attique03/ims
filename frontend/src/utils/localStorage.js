import secureLocalStorage from "react-secure-storage";

export const setLocalStorage = (name, data) =>
  secureLocalStorage.setItem(name, JSON.stringify(data));

export const getLocalStorage = (name) => secureLocalStorage.getItem(name);

export const removeLocalStorage = (name) => secureLocalStorage.removeItem(name);
