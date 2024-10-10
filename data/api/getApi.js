import { api } from "../axios";
// CUSTOMER SECTION API REQUEST
// #SERVICE REQUEST
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
export const getLaundryPickup = async (storeId) => {
  try {
    const response = await api.get(`/staff/${storeId}/get-laundry-pickup`);
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
export const getStaffMessage = async (id, data) => {
  try {
    const response = await api.get(`/staff/${id}/get-staff-list-convo`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// #PROFILE MANAGEMENT
