export const createEventApi = "/api/events";
export const createAllDayEventApi = "/api/events/createAllDay";
export const getAllEventsApi = "/api/events";
export const getAllDayEventsApi = "/api/events/allDayEvents";

export const deleteEventApi = (id) => {
  return `/api/events/${id}`;
};

export const updateEventApi = (id) => {
  return `/api/events/${id}`;
};

export const getEventApi = (id) => {
  return `/api/events/${id}`;
};
