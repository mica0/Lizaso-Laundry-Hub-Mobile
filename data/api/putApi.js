import { api } from "../axios";
// CUSTOMER SECTION API REQUEST

// STAFF SECTION API REQUEST
// For pending cancel request
export const updateServiceRequestCancel = async (requestId) => {
  try {
    const response = await api.put(`/staff/${requestId}/update-request-cancel`);
    return response;
  } catch (error) {
    throw error;
  }
};

// For pending get laundry change the request status to ongoing pickup
export const updateServiceRequestGetLaundry = async (requestId) => {
  try {
    const response = await api.put(
      `/staff/${requestId}/update-request-ongoing`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// For ongoing service request back to pending pickup
export const updateServiceRequestBackToPending = async (requestId) => {
  try {
    const response = await api.put(
      `/staff/${requestId}/update-request-back-pending`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// For ongoing request it use QR CODE
export const updateServiceRequestOnGoing = async (qrCode) => {
  try {
    const response = await api.put(`/staff/${qrCode}/update-request-ongoing`);
    return response;
  } catch (error) {
    throw error;
  }
};
