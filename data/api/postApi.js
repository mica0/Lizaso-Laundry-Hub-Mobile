import { api } from "../axios";
// CUSTOMER SECTION API REQUEST

// STAFF SECTION API REQUEST
export const setPostNewMessage = async (id, messageData) => {
  try {
    const response = await api.post(
      `/message/${id}/set-new-messages`,
      messageData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
