import { api } from "../axios";
// CUSTOMER SECTION API REQUEST

// STAFF SECTION API REQUEST
// export const createMessageSenderStaff = async (messageData) => {
//   try {
//     console.log(messageData);
//     const response = await api.post(
//       `/staff/set-messages-sender-staff`,
//       messageData
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createMessageSenderStaff = async (messageData) => {
//   try {
//     console.log(messageData);
//     const response = await api.post(
//       `/staff/set-messages-sender-staff`,
//       messageData
//     );
//     console.log("API Response:", response); // Log the entire response
//     return response.data;
//   } catch (error) {
//     console.error(
//       "API Error:",
//       error.response ? error.response.data : error.message
//     );
//     throw error;
//   }
// };

export const createMessageSenderStaff = async (messageData) => {
  try {
    console.log("Sending message data:", messageData);
    const response = await api.post(
      `/staff/set-messages-sender-staff`,
      messageData
    );

    // console.log("Response from API:", response);
    return response.data;
  } catch (error) {
    console.error("Error in API function:", error);
    throw error; // This will be caught in the calling function
  }
};
