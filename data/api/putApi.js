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

// For ongoing pickup to finish picup
export const updateServiceRequestFinishiPickup = async (requestId) => {
  try {
    const response = await api.put(
      `/staff/${requestId}/update-request-finish-pickup`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// For ongoing request it use QR CODE
export const updateServiceRequestUsingQRCode = async (code, qrData) => {
  try {
    const match = code.match(/SR-(\d+)-/);
    const serviceRequestId = match ? match[1] : null; // Get the matched number

    if (!serviceRequestId) {
      throw new Error("Invalid QR code format");
    }

    const response = await api.put(
      `/staff/${serviceRequestId}/update-request-qr-code`,
      qrData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
