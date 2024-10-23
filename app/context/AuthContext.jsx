import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/data/axios";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide authentication context
export const AuthProvider = ({ children }) => {
  const isFetchingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    storeId: "",
    addressId: "",
    username: "",
    mobile_number: "",
    firstname: "",
    middlename: "",
    lastname: "",
    fullname: "",
    user_type: "",
  });

  const fetchUserDetails = async (token) => {
    if (!token || isFetchingRef.current) return; // Prevent duplicate fetches

    isFetchingRef.current = true; // Mark fetch as ongoing
    try {
      const response = await api.get(`/mobile-users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const user = response.data.data;

        setUserDetails({
          userId: user.id,
          storeId: user.store_id,
          addressId: user.address_id,
          username: user.username,
          mobile_number: user.mobile_number,
          firstname: user.first_name,
          middlename: user.middle_name,
          lastname: user.last_name,
          fullname: `${user.first_name} ${user.middle_name || ""} ${
            user.last_name
          }`,
          user_type: user.user_type,
        });
      } else {
        console.error("Error fetching user details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        await fetchUserDetails(token); // Fetch user details with the token
      }
    } catch (error) {
      console.error("Error loading user token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    userDetails,
    setUser: setUserDetails,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;

// // Load user details from AsyncStorage on initial mount
// useEffect(() => {
//   const loadUserDetails = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem("userDetails");
//       if (jsonValue) {
//         const user = JSON.parse(jsonValue);
//         setUserDetails(user);
//       } else {
//         const sampleUser = {
//           userId: 1,
//           storeId: 1,
//           firstname: "Juan",
//           middlename: "Dela",
//           lastname: "Cruz",
//           email: "juan@example.com",
//           phone: "09123456789",
//           fullName: "Juan Dela Cruz",
//           username: "juandc",
//           roleName: "Staff",
//         };
//         setUserDetails(sampleUser);
//         await AsyncStorage.setItem("userDetails", JSON.stringify(sampleUser));
//       }
//     } catch (e) {
//       console.error("Failed to load user details:", e);
//     }
//   };

//   loadUserDetails();
// }, []);

// const setUser = async (user) => {
//   setUserDetails(user);
//   try {
//     const jsonValue = JSON.stringify(user);
//     await AsyncStorage.setItem("userDetails", jsonValue);
//   } catch (e) {
//     console.error("Failed to save user details:", e);
//   }
// };

// import React, { createContext, useState, useContext, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Create AuthContext
// const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to provide authentication context
// export const AuthProvider = ({ children }) => {
//   const [userDetails, setUserDetails] = useState(null);

//   // Load user details from AsyncStorage on initial mount
//   useEffect(() => {
//     const loadUserDetails = async () => {
//       try {
//         const jsonValue = await AsyncStorage.getItem("userDetails");
//         if (jsonValue) {
//           setUserDetails(JSON.parse(jsonValue));
//         } else {
//           // If no user details in AsyncStorage, set sample data
//           const sampleUser = {
//             userId: 6,
//             storeId: 1,
//             firstname: "Juan",
//             middlename: "Dela",
//             lastname: "Cruz",
//             email: "juan@example.com",
//             phone: "09123456789",
//             fullName: "Juan Dela Cruz",
//             username: "juandc",
//             roleName: "Staff",
//             permissions: {
//               canRead: true,
//               canWrite: true,
//               canEdit: true,
//               canDelete: false,
//             },
//           };
//           // Set the sample user in state
//           setUserDetails(sampleUser);
//           // Save sample user to AsyncStorage
//           await AsyncStorage.setItem("userDetails", JSON.stringify(sampleUser));
//         }
//       } catch (e) {
//         console.error("Failed to load user details:", e);
//       }
//     };

//     loadUserDetails();
//   }, []);

//   // Function to set user details and save to AsyncStorage
//   const setUser = async (user) => {
//     setUserDetails(user);
//     try {
//       const jsonValue = JSON.stringify(user);
//       await AsyncStorage.setItem("userDetails", jsonValue);
//     } catch (e) {
//       console.error("Failed to save user details:", e);
//     }
//   };

//   const value = {
//     userDetails,
//     setUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default useAuth;
