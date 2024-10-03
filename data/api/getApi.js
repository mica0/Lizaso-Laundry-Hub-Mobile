// CUSTOMER SECTION API REQUEST

import { api } from "../axios";

// STAFF SECTION API REQUEST

// Get Customer request services for laundry pickup module
export const getLaundryPickup = async (storeId) => {
  try {
    const response = await api.get(`/laundry-pickup?store_id=${storeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Customer request services for laundry delivery module //
export const getLaundryDelivery = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getLaundryPickup = async (data) => {
//   try {
//     const response = await api.post("/", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
