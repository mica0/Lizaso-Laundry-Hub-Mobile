import { api } from "../axios";
// CUSTOMER SECTION API REQUEST
// #SERVICE REQUEST
export const getLaundryServices = async (storeId) => {
  try {
    const response = await api.get(`/customers/${storeId}/get-service-types`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// #TRACK ORDER

// #PAYMENT HISTORY

// #PROFILE MANAGEMENT

// #MESSAGE MODULE
export const getCustomerMessage = async (id, data) => {
  try {
    const response = await api.get(
      `/customer/${id}/get-customer-list-convo`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// STAFF SECTION API REQUEST

// # LAUNDRY PICKUP MODULE

// Get Customer request services for laundry pickup module
export const getLaundryPickup = async (storeId, user_id) => {
  try {
    const response = await api.get(`/staff/${storeId}/get-laundry-pickup`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Customer request services for laundry delivery module
export const getLaundryDelivery = async (data) => {
  try {
    const response = await api.get("/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//#LAUNDRY DELIVERY MODULE

// #MESSAGE MODULE
export const getStaffMessage = async (id) => {
  try {
    const response = await api.get(`/staff/${id}/get-staff-convo`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// #PROFILE MANAGEMENT
