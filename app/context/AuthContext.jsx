import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide authentication context
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  // Load user details from AsyncStorage on initial mount
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userDetails");
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          setUserDetails(user);
        } else {
          const sampleUser = {
            userId: 6,
            storeId: 1,
            firstname: "Juan",
            middlename: "Dela",
            lastname: "Cruz",
            email: "juan@example.com",
            phone: "09123456789",
            fullName: "Juan Dela Cruz",
            username: "juandc",
            roleName: "Staff",
            permissions: {
              canRead: true,
              canWrite: true,
              canEdit: true,
              canDelete: false,
            },
          };
          setUserDetails(sampleUser);
          await AsyncStorage.setItem("userDetails", JSON.stringify(sampleUser));
        }
      } catch (e) {
        console.error("Failed to load user details:", e);
      }
    };

    loadUserDetails();
  }, []);

  const setUser = async (user) => {
    setUserDetails(user);
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("userDetails", jsonValue);
    } catch (e) {
      console.error("Failed to save user details:", e);
    }
  };

  const value = {
    userDetails,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;

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
