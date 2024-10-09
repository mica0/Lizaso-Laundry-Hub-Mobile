import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet/";
import { Picker } from "@react-native-picker/picker";

import d_profile1 from "../../assets/images/d_profile1.png";
import d_profile2 from "../../assets/images/d_profile2.png";
import d_profile3 from "../../assets/images/d_profile3.png";
import d_profile4 from "../../assets/images/d_profile4.png";

// Randomize Default Image
const defaultProfileImages = [d_profile1, d_profile2, d_profile3, d_profile4];

const getRandomDefaultImage = () => {
  const randomIndex = Math.floor(Math.random() * defaultProfileImages.length);
  return defaultProfileImages[randomIndex];
};

export default function Profile() {
  // const snapPoints = useMemo(() => ["40%"], []);
  const [randomProfileImage, setRandomProfileImage] = useState(null);
  const [snapPoints, setSnapPoints] = useState(["10%"]);
  const [enablePanDownToClose, setenablePanDownToClose] = useState(true);
  const bottomSheetRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");

  // Data Input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const user = {
    name: "John Reynald P. Velarde",
    username: "macArthur16",
    // profilePicture: "https://via.placeholder.com/150",
    profilePicture: "",
    mobileNumber: "09472727061",
  };

  useEffect(() => {
    if (!user.profilePicture) {
      setRandomProfileImage(getRandomDefaultImage());
    }
  }, [user.profilePicture]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const validateFields = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!firstname) {
      newErrors.firstname = "First name is required";
    }

    if (!lastname) {
      newErrors.lastname = "Last name is required";
    }

    return newErrors;
  };
  const handleInputChange = (field) => (value) => {
    // Update state based on the field
    switch (field) {
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "firstname":
        setFirstName(value);
        break;
      case "middlename":
        setMiddleName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const openSheet = (title) => {
    setHeaderTitle(title);
    if (title === "Edit Profile") {
      setSnapPoints(["100%"]);
      setenablePanDownToClose(false);
      setUsername(user.username);
    } else if (title === "Manage Notifications") {
      setSnapPoints(["60%"]);
      setenablePanDownToClose(true);
    }
    bottomSheetRef.current?.expand();
  };

  const closeSheet = async () => {
    Keyboard.dismiss();
    await new Promise((resolve) => setTimeout(resolve, 100));
    bottomSheetRef.current?.close();
  };

  const handleUpdateProfile = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Success");
      setLoading(true);
    }
  };

  const handleUpdateNotifications = async () => {
    console.log("Success Update Notifications");
  };

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Upper */}
        <View style={styles.upperContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={
                  user.profilePicture
                    ? { uri: user.profilePicture }
                    : randomProfileImage
                }
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={() => openSheet("Update Profile Picture")}
              >
                <Ionicons name="camera" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>
              {user.username} | {user.mobileNumber}
            </Text>
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={1}
            onPress={() => openSheet("Edit Profile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => openSheet("Manage Notifications")}
          >
            <View style={styles.outlineBox}>
              <View style={styles.rowContainer}>
                <Entypo
                  name="notification"
                  size={24}
                  color={COLORS.secondary}
                  style={styles.icon}
                />
                <Text style={styles.boxText}>Notifications</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.secondary}
                  style={styles.arrow}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => openSheet("Manage Notifications")}
          >
            <View style={styles.outlineBox}>
              <View style={styles.rowContainer}>
                <MaterialCommunityIcons
                  name="data-matrix-scan"
                  size={24}
                  color={COLORS.secondary}
                  style={styles.icon}
                />
                <Text style={styles.boxText}>Scan Settings</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.secondary}
                  style={styles.arrow}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.outlineBox}>
            <View style={styles.rowContainer}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={COLORS.secondary}
                style={styles.icon}
              />
              <Text style={styles.boxText}>Logout</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.secondary}
                style={styles.arrow}
              />
            </View>
          </View>
        </View>

        {/*BottomSheetModal*/}
        <Portal>
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={enablePanDownToClose}
            backgroundStyle={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{headerTitle}</Text>

              <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            {headerTitle === "Edit Profile" ? (
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flex: 1, minHeight: "70%" }}
              >
                <View style={styles.editProfileContainer}>
                  {/* Username */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: fonts.Medium,
                        marginVertical: 8,
                        color: COLORS.primary,
                      }}
                    >
                      Username
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        height: 48,
                        borderColor: errors.username
                          ? COLORS.error
                          : COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                      }}
                    >
                      <TextInput
                        placeholder="Enter your username"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        value={username}
                        onChangeText={handleInputChange("username")}
                        style={{ width: "100%", fontFamily: fonts.Regular }}
                      />
                    </View>
                    {errors.username && (
                      <Text
                        style={{
                          color: COLORS.error,
                          fontSize: 12,
                          marginTop: 4,
                          marginStart: 10,
                        }}
                      >
                        {errors.username}
                      </Text>
                    )}
                  </View>
                  {/* MOBILE NUMBER */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: fonts.Medium,
                        marginVertical: 8,
                        color: COLORS.primary,
                      }}
                    >
                      Mobile Number
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        height: 48,
                        borderColor: errors.phoneNumber
                          ? COLORS.error
                          : COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22,
                      }}
                    >
                      <TextInput
                        placeholder="+63"
                        placeholderTextColor={COLORS.primary}
                        editable={false}
                        style={{
                          width: "12%",
                          borderRightWidth: 1,
                          borderRightColor: errors.phoneNumber
                            ? COLORS.error
                            : COLORS.primary,
                          height: "100%",
                          fontFamily: fonts.Medium,
                        }}
                      />
                      <TextInput
                        placeholder="Enter your phone number"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={handleInputChange("phoneNumber")}
                        style={{ width: "80%", fontFamily: fonts.Regular }}
                      />
                    </View>
                    {errors.phoneNumber && (
                      <Text
                        style={{
                          color: COLORS.error,
                          fontSize: 12,
                          marginTop: 4,
                          marginStart: 10,
                        }}
                      >
                        {errors.phoneNumber}
                      </Text>
                    )}
                  </View>
                  {/* First name */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: fonts.Medium,
                        marginVertical: 8,
                        color: COLORS.primary,
                      }}
                    >
                      Firstname
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        height: 48,
                        borderColor: errors.firstname
                          ? COLORS.error
                          : COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                      }}
                    >
                      <TextInput
                        placeholder="Enter your first name"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        value={firstname}
                        onChangeText={handleInputChange("firstname")}
                        style={{ width: "100%", fontFamily: fonts.Regular }}
                      />
                    </View>
                    {errors.firstname && (
                      <Text
                        style={{
                          color: COLORS.error,
                          fontSize: 12,
                          marginTop: 4,
                          marginStart: 10,
                        }}
                      >
                        {errors.firstname}
                      </Text>
                    )}
                  </View>
                  {/* Middle name */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: fonts.Medium,
                        marginVertical: 8,
                        color: COLORS.primary,
                      }}
                    >
                      Middlename
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                      }}
                    >
                      <TextInput
                        placeholder="Enter your middle name (if applicable)"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        value={middlename}
                        onChangeText={handleInputChange("middlename")}
                        style={{ width: "100%", fontFamily: fonts.Regular }}
                      />
                    </View>
                  </View>
                  {/* Last name */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: fonts.Medium,
                        marginVertical: 8,
                        color: COLORS.primary,
                      }}
                    >
                      Lastname
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        height: 48,
                        borderColor: errors.lastname
                          ? COLORS.error
                          : COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                      }}
                    >
                      <TextInput
                        placeholder="Enter your lastname"
                        placeholderTextColor={COLORS.grey}
                        keyboardType="default"
                        value={lastname}
                        onChangeText={handleInputChange("lastname")}
                        style={{ width: "100%", fontFamily: fonts.Regular }}
                      />
                    </View>
                    {errors.lastname && (
                      <Text
                        style={{
                          color: COLORS.error,
                          fontSize: 12,
                          marginTop: 4,
                          marginStart: 10,
                        }}
                      >
                        {errors.lastname}
                      </Text>
                    )}
                  </View>
                </View>
              </ScrollView>
            ) : headerTitle === "Manage Notifications" ? (
              <View style={styles.notificationsContainer}>
                <Text style={styles.switchLabel}>Receive Notifications</Text>
                <Switch
                // value={notificationsEnabled}
                // onValueChange={setNotificationsEnabled}
                />
                <Text style={styles.notificationFrequencyLabel}>
                  Notification Frequency
                </Text>
                <Picker
                // selectedValue={notificationFrequency} // State for notification frequency
                // onValueChange={(itemValue) =>
                //   setNotificationFrequency(itemValue)
                // } // Function to update frequency
                >
                  <Picker.Item label="24 hours quiet" value="24h" />
                  <Picker.Item label="1 hour quiet" value="1h" />
                  {/* Add more options as needed */}
                </Picker>
              </View>
            ) : null}

            {/* Save Button */}
            <View
              style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}
            >
              <TouchableOpacity
                // style={styles.saveButton}
                disabled={loading}
                style={{
                  backgroundColor: COLORS.secondary,
                  borderRadius: 10,
                  marginTop: 10,
                  padding: 10,
                  opacity: loading ? 0.7 : 1,
                  height: 50,
                  justifyContent: "center",
                  margin: 20,
                  alignItems: "center",
                }}
                onPress={() => {
                  if (headerTitle === "Edit Profile") {
                    handleUpdateProfile();
                  } else if (headerTitle === "Manage Notifications") {
                    handleUpdateNotifications();
                  }
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color={COLORS.white} />
                ) : (
                  <Text style={styles.saveButtonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </Portal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    padding: 10,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  username: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: COLORS.white,
  },
  bio: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 10,
    // Shadow Section
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  editButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  editButtonText: {
    fontFamily: fonts.SemiBold,
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  outlineBox: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: COLORS.white,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    // Elevation for Android
    elevation: 1,
  },
  boxText: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space out elements
    width: "100%", // Ensure it takes the full width
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },

  arrow: {
    marginLeft: 10, // Space between text and arrow
  },
  closeButton: {
    backgroundColor: COLORS.light,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 5,
    width: "100%",
  },
  editProfileContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  notificationsContainer: {
    padding: 20,
  },
  switchLabel: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginBottom: 10,
  },
  notificationFrequencyLabel: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: COLORS.secondary, // Use your primary color
    paddingVertical: 15,
    borderRadius: 10,
    margin: 20, // Margin to separate from edges
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
});

// const user = {
//   name: "MacArthur P. Mabilis",
//   username: "macArthur16",
//   bio: "Coffee lover ☕ | Traveler 🌍 | Tech enthusiast 💻",
//   profilePicture: "https://via.placeholder.com/150",
//   profilePicture: "",
//   followers: 1250,
//   following: 345,
// };
