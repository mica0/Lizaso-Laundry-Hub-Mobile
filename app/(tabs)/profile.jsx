import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather"; // Make sure to install this

const Profile = () => {
  const user = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Coffee lover ☕ | Traveler 🌍 | Tech enthusiast 💻",
    profilePicture: "https://via.placeholder.com/150",
    followers: 1250,
    following: 345,
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: user.profilePicture }}
        style={styles.profileImage}
      />

      {/* User Info */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Follower Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="bell" size={20} color="#333" />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="camera" size={20} color="#333" />
          <Text style={styles.menuText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="settings" size={20} color="#333" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="log-out" size={20} color="#333" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    backgroundColor: "#5787C8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  menuContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Profile;

// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// const Profile = () => {
//   const user = {
//     name: "John Doe",
//     username: "@johndoe",
//     bio: "Coffee lover ☕ | Traveler 🌍 | Tech enthusiast 💻",
//     profilePicture: "https://via.placeholder.com/150",
//     followers: 1250,
//     following: 345,
//   };

//   return (
//     <View style={styles.container}>
//       {/* Profile Picture */}
//       <Image
//         source={{ uri: user.profilePicture }}
//         style={styles.profileImage}
//       />

//       {/* User Info */}
//       <Text style={styles.name}>{user.name}</Text>
//       <Text style={styles.username}>{user.username}</Text>
//       <Text style={styles.bio}>{user.bio}</Text>

//       {/* Follower Stats */}
//       <View style={styles.statsContainer}>
//         <View style={styles.statBox}>
//           <Text style={styles.statNumber}>{user.followers}</Text>
//           <Text style={styles.statLabel}>Followers</Text>
//         </View>
//         <View style={styles.statBox}>
//           <Text style={styles.statNumber}>{user.following}</Text>
//           <Text style={styles.statLabel}>Following</Text>
//         </View>
//       </View>

//       {/* Edit Profile Button */}
//       <TouchableOpacity style={styles.editButton}>
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f2f2f2",
//     padding: 20,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 15,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   username: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 10,
//   },
//   bio: {
//     fontSize: 14,
//     color: "#777",
//     textAlign: "center",
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginBottom: 20,
//   },
//   statBox: {
//     alignItems: "center",
//   },
//   statNumber: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   statLabel: {
//     fontSize: 14,
//     color: "#666",
//   },
//   editButton: {
//     backgroundColor: "#5787C8",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//   },
//   editButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default Profile;

// import { View, Text } from "react-native";
// import React from "react";

// const profile = () => {
//   return (
//     <View>
//       <Text>profile</Text>
//     </View>
//   );
// };

// export default profile;
