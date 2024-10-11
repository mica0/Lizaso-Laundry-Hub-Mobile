import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler"; // Use FlatList from 'react-native-gesture-handler' for better performance
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { ServiceItem } from "../../components/customer/ServiceItem";

const sampleServices = [
  {
    id: "1",
    name: "Wash & Fold",
    description: "Basic wash and fold service.",
    price: "$15",
    promo: true, // Added promo flag
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: "2",
    name: "Dry Cleaning",
    description: "Professional dry cleaning service.",
    price: "$25",
    promo: false,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Ironing",
    description: "Expert ironing service.",
    price: "$10",
    promo: true, // Added promo flag
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Laundry Pickup",
    description: "Convenient laundry pickup service.",
    price: "$5",
    promo: false,
    image: "https://via.placeholder.com/150",
  },
];

const laundryItems = [
  { id: "1", name: "Downy" },
  { id: "2", name: "Tide Detergent" },
  { id: "3", name: "Arm & Hammer" },
  { id: "4", name: "Purex" },
  { id: "5", name: "Bounce" },
];

export default function Home() {
  const navigation = useNavigation();
  const [notiCount, setNotiCount] = useState({ count: 1 });

  const handleGoToNotification = () => {
    console.log("Navigating to notifications");
    navigation.navigate("notification/list", {});
  };

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderServiceItem = ({ item }) => {
    return (
      <ServiceItem
        item={item}
        isExpanded={!!expandedItems[item.id]} // Check if this item's ID is in the expanded state
        onToggle={() => toggleExpanded(item.id)} // Pass the toggle function
      />
    );
  };

  // const renderServiceItem = ({ item }) => {
  //   return (
  //     <View style={styles.serviceItem}>
  //       <Image source={{ uri: item.image }} style={styles.serviceImage} />
  //       <View style={styles.serviceInfo}>
  //         <Text style={styles.serviceName}>{item.name}</Text>
  //         <Text style={styles.serviceDescription}>{item.description}</Text>
  //         <Text style={styles.servicePrice}>{item.price}</Text>
  //         <TouchableOpacity style={styles.serviceButton}>
  //           <Text style={styles.buttonText}>Select</Text>
  //         </TouchableOpacity>
  //       </View>
  //       {item.promo && <Text style={styles.promoBadge}>Promo</Text>}
  //       {/* Promo Badge */}
  //     </View>
  //   );
  // };
  // const [expanded, setExpanded] = useState(false);

  // const renderServiceItem = ({ item }) => {
  //   const toggleDetails = () => {
  //     setExpanded(!expanded);
  //   };

  //   return (
  //     <View style={styles.serviceItem}>
  //       <Image source={{ uri: item.image }} style={styles.serviceImage} />
  //       <View style={styles.serviceInfo}>
  //         <Text style={styles.serviceName}>{item.name}</Text>
  //         <Text style={styles.serviceDescription}>{item.description}</Text>
  //         <Text style={styles.servicePrice}>{item.price}</Text>
  //         {expanded && (
  //           <>
  //             <Text style={styles.promoDetails}>Special Promo Details!</Text>
  //             <Text style={styles.promoDetails}>Special Promo Details!</Text>
  //           </>
  //         )}
  //         {/* Promo details */}
  //         <TouchableOpacity style={styles.serviceButton}>
  //           <Text style={styles.buttonText}>Select</Text>
  //         </TouchableOpacity>
  //       </View>
  //       {item.promo && <Text style={styles.promoBadge}>Promo</Text>}
  //       <TouchableOpacity
  //         onPress={toggleDetails}
  //         style={styles.collapseIconContainer}
  //       >
  //         <Ionicons
  //           name={expanded ? "chevron-up" : "chevron-down"}
  //           size={24}
  //           color={COLORS.primary}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* Upper Design */}
        <View style={{ marginBottom: 1, marginStart: 20, marginTop: 10 }}>
          <View style={styles.header}>
            <View>
              <Text style={styles.staffName}>John Doe</Text>
              <Text style={styles.storeName}>123 Main St, Springfield</Text>
            </View>

            <TouchableOpacity
              onPress={handleGoToNotification}
              style={styles.notificationIcon}
            >
              <Ionicons
                name="notifications-sharp"
                size={24}
                color={COLORS.white}
              />
              {notiCount.count > 0 && (
                <View style={styles.badge}>
                  <Text
                    style={[
                      styles.badgeText,
                      { fontSize: notiCount.count > 99 ? 10 : 12 },
                    ]}
                  >
                    {notiCount.count > 99 ? "99+" : notiCount.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Title for Laundry Items */}
        <View style={styles.carouselTitleContainer}>
          <Text style={styles.carouselTitle}>Available Laundry Items</Text>
        </View>

        {/* Carousel for Laundry Items */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={laundryItems}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
          />
        </View>

        {/* Services List */}
        <View style={styles.listContainer}>
          <FlatList
            data={sampleServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingRight: 20,
  },
  staffName: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: COLORS.white,
  },
  storeName: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: COLORS.white,
    marginTop: 2,
  },
  notificationIcon: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 5,
    borderRadius: 5,
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 2,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    elevation: 3,
    position: "relative", // Set position relative to position promo badge absolutely
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
  serviceDescription: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: COLORS.gray,
  },
  servicePrice: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: COLORS.secondary,
  },
  promoBadge: {
    position: "absolute", // Use absolute positioning for the promo badge
    top: 10,
    right: 10,
    backgroundColor: "orange",
    color: COLORS.white,
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  serviceButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  carouselTitleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  carouselTitle: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  carouselContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  carouselItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  carouselContent: {
    paddingVertical: 10,
  },
  collapseIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  promoDetails: {
    marginTop: 5,
    fontStyle: "italic",
    color: COLORS.gray,
  },
});

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   Pressable,
// } from "react-native";
// import { useNavigation } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FlashList } from "@shopify/flash-list";
// import { Portal } from "@gorhom/portal";
// import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import { fonts } from "../../constants/fonts";

// export default function Home() {
//   const navigaton = useNavigation();
//   const [services, setServices] = useState([]);
//   const [notiCount, setNotiCount] = useState({ count: 1 });

//   const handleGoToNotification = async (id) => {
//     console.log("Message ID Customer: " + id);
//     navigaton.navigate("notification/list", {});
//   };

//   return (
//     <LinearGradient
//       colors={["#5787C8", "#71C7DA"]}
//       locations={[0, 0.8]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1.5, y: 0 }}
//       style={{ flex: 1 }}
//     >
//       <SafeAreaView style={styles.container}>
//         {/* Upper Design */}
//         <View style={{ marginBottom: 1, marginStart: 20, marginTop: 10 }}>
//           <View style={styles.header}>
//             <View>
//               <Text style={styles.staffName}>Staff Name</Text>
//               <Text style={styles.storeName}>Laundry Store Name</Text>
//             </View>
//             <TouchableOpacity
//               onPress={handleGoToNotification}
//               style={styles.notificationIcon}
//             >
//               <Ionicons
//                 name="notifications-sharp"
//                 size={24}
//                 color={COLORS.white}
//               />
//               {notiCount.count > 0 && (
//                 <View style={styles.badge}>
//                   <Text
//                     style={[
//                       styles.badgeText,
//                       { fontSize: notiCount.count > 99 ? 10 : 12 },
//                     ]}
//                   >
//                     {notiCount.count > 99 ? "99+" : notiCount.count}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Services List */}
//         <View style={styles.listContainer}>
//           <FlatList
//             data={sampleServices}
//             renderItem={renderServiceItem}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={{ paddingBottom: 60 }}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//     // <LinearGradient
//     //   colors={["#5787C8", "#71C7DA"]}
//     //   locations={[0, 0.8]}
//     //   start={{ x: 0, y: 0 }}
//     //   end={{ x: 1.5, y: 0 }}
//     //   style={{ flex: 1 }}
//     // >
//     //   <SafeAreaView style={styles.container}>
//     //     {/* Upper Design */}
//     //     <View style={{ marginBottom: 1, marginStart: 20, marginTop: 10 }}>
//     //       <View
//     //         style={{
//     //           flexDirection: "row",
//     //           justifyContent: "space-between",
//     //           alignItems: "center",
//     //           marginTop: 10,
//     //           paddingRight: 20,
//     //         }}
//     //       >
//     //         <View>
//     //           <Text
//     //             style={{
//     //               fontFamily: fonts.SemiBold,
//     //               fontSize: 18,
//     //               color: COLORS.white,
//     //             }}
//     //           >
//     //             Staff Name
//     //           </Text>
//     //           <Text
//     //             style={{
//     //               fontFamily: fonts.Medium,
//     //               fontSize: 14,
//     //               color: COLORS.white,
//     //               marginTop: 2,
//     //             }}
//     //           >
//     //             Laundry Store Name
//     //           </Text>
//     //         </View>
//     //         {/* Notification Bell Icon */}
//     //         <View style={{ position: "relative" }}>
//     //           <TouchableOpacity
//     //             onPress={handleGoToNotification}
//     //             style={{
//     //               borderWidth: 1,
//     //               borderColor: COLORS.white,
//     //               padding: 5,
//     //               borderRadius: 5,
//     //             }}
//     //           >
//     //             <Ionicons
//     //               name="notifications-sharp"
//     //               size={24}
//     //               color={COLORS.white}
//     //             />
//     //             {notiCount.count > 0 && (
//     //               <View style={styles.badge}>
//     //                 <Text
//     //                   style={[
//     //                     styles.badgeText,
//     //                     { fontSize: notiCount.count > 99 ? 10 : 12 },
//     //                   ]}
//     //                 >
//     //                   {notiCount.count > 99 ? "99+" : notiCount.count}
//     //                 </Text>
//     //               </View>
//     //             )}
//     //           </TouchableOpacity>
//     //         </View>
//     //       </View>
//     //     </View>

//     //     {/* Bottom Design */}
//     //     <View style={styles.listContainer}>
//     //       {/* Upper */}

//     //       {/* <View style={{ flex: 1, justifyContent: "center" }}>
//     //         {loading && !pickupData.length ? (
//     //           <ActivityIndicator size="large" color={COLORS.secondary} />
//     //         ) : error ? (
//     //           <ActivityIndicator size="large" color={COLORS.secondary} />
//     //         ) : (
//     //           <FlashList
//     //             data={sortedServices}
//     //             renderItem={renderItem}
//     //             keyExtractor={(item) => item.request_id.toString()}
//     //             contentContainerStyle={{ paddingBottom: 60 }}
//     //             showsVerticalScrollIndicator={false}
//     //             estimatedItemSize={100}
//     //           />
//     //         )}
//     //       </View> */}
//     //     </View>

//     //     {/* Select Services */}
//     //     <Portal></Portal>
//     //   </SafeAreaView>
//     // </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   headerTitle: {
//     fontFamily: fonts.SemiBold,
//     fontSize: 18,
//     color: COLORS.primary,
//   },
//   closeButton: {
//     backgroundColor: COLORS.light,
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 24,
//   },
//   finishButton: {
//     padding: 10,
//     backgroundColor: COLORS.secondary,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "55%",
//   },
//   container: {
//     flex: 1,
//   },
//   firstContainer: {
//     padding: 16,
//   },
//   listContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//     marginTop: 20,
//     // Shadow Section
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontFamily: fonts.Bold,
//     marginBottom: 16,
//     color: "#333",
//   },
//   itemContainer: {
//     padding: 18,
//     backgroundColor: COLORS.white,
//     marginBottom: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%",
//   },
//   itemDetails: {
//     flexDirection: "column",
//     width: "100%",
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//   },
//   customerText: {
//     fontSize: 16,
//     fontFamily: fonts.Bold,
//     color: COLORS.primary,
//     marginBottom: 2,
//   },
//   itemText: {
//     fontSize: 12,
//     fontFamily: fonts.Medium,
//     color: COLORS.primary,
//     marginBottom: 2,
//   },
//   locationText: {
//     fontSize: 14,
//     fontFamily: fonts.SemiBold,
//     color: COLORS.secondary,
//     marginBottom: 8,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#ddd",
//     marginBottom: 5,
//     width: "100%",
//   },
//   requestStatusContainer: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//   },
//   dateContainer: {
//     flexDirection: "row",
//   },
//   statusContainer: {
//     flexDirection: "row",
//   },
//   labelText: {
//     fontSize: 12,
//     fontFamily: fonts.SemiBold,
//     color: COLORS.primary,
//   },
//   dateText: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.black,
//   },
//   statusText: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.primary,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     paddingVertical: 10,
//     backgroundColor: COLORS.lightGray,
//     borderRadius: 10,
//     marginBottom: 12,
//     gap: 12,
//     alignItems: "center",
//   },
//   tab: {
//     flex: 1,
//     height: 40,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   activeTab: {
//     backgroundColor: COLORS.secondary,
//     borderColor: COLORS.secondary,
//   },

//   tabText: {
//     fontSize: 15,
//     color: COLORS.secondary,
//     fontFamily: fonts.SemiBold,
//   },

//   activeTabText: {
//     color: COLORS.white,
//   },
//   button: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//   },

//   messageButton: {
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     padding: 5,
//   },
//   badge: {
//     position: "absolute",
//     right: -5,
//     top: -5,
//     backgroundColor: COLORS.message,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });

{
  /* <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Ongoing Pickup</Text>
              <TouchableOpacity
                onPress={closeOngoingModal}
                style={styles.closeButton}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginStart: 20,
                marginEnd: 20,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.SemiBold,
                  fontSize: 16,
                  color: COLORS.text3,
                }}
              >
                Customer Details
              </Text>
              <Text
                style={{
                  fontFamily: fonts.SemiBold,
                  fontSize: 15,
                  color: "white",
                  backgroundColor: COLORS.success,
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  maxWidth: "50%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedService?.service_name || "No Service Selected"}
              </Text>
            </View>

            <View style={styles.contentContainer}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.divider,
                  borderRadius: 10,
                  paddingTop: 10,
                }}
              >
                <View>
                  {selectedService && (
                    <>
                      <View style={{ paddingStart: 20, marginBottom: 10 }}>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                          <Text
                            style={{
                              fontFamily: fonts.Bold,
                              fontSize: 14,
                              color: COLORS.text3,
                            }}
                          >
                            Customer:
                          </Text>
                          <Text
                            style={{
                              fontFamily: fonts.Medium,
                              fontSize: 14,
                              color: COLORS.primary,
                            }}
                          >
                            {selectedService.customer_fullname}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                          <Text
                            style={{
                              fontFamily: fonts.Bold,
                              fontSize: 14,
                              color: COLORS.text3,
                            }}
                          >
                            Location:
                          </Text>
                          <Text
                            style={{
                              fontFamily: fonts.Medium,
                              fontSize: 14,
                              color: COLORS.secondary,
                              flexShrink: 1,
                              flexWrap: "wrap",
                              maxWidth: "80%",
                            }}
                          >
                            {selectedService.address_line1}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "#ddd",
                          width: "100%",
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: COLORS.secondary,
                          borderRadius: 20,
                          marginTop: 10,
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          maxWidth: "90%",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            color: COLORS.white,
                            fontSize: 12,
                          }}
                        >
                          {timeAgo(selectedService.request_date)}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignSelf: "center",
                          marginBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            color: COLORS.primary,
                            fontSize: 10,
                          }}
                        >
                          Waiting for Pickup
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 10,
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: COLORS.light,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                    onPress={() =>
                      handleReturnToPending(selectedService.request_id)
                    }
                  >
                    <Text
                      style={{
                        fontFamily: fonts.SemiBold,
                        fontSize: 16,
                        color: COLORS.black,
                      }}
                    >
                      Return to pending
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.finishButton}
                    onPress={() =>
                      handleFinishPickup(selectedService.request_id)
                    }
                  >
                    <Text
                      style={{
                        fontFamily: fonts.SemiBold,
                        fontSize: 16,
                        color: COLORS.white,
                      }}
                    >
                      Finish Pickup
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BottomSheet> */
}
