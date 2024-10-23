import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { ServiceItem } from "../../components/customer/ServiceItem";
import usePolling from "../../hooks/usePolling";
import { getLaundryServices } from "../../data/api/getApi";
import useAuth from "../context/AuthContext";

const laundryItems = [
  { id: "1", name: "Downy" },
  { id: "2", name: "Tide Detergent" },
  { id: "3", name: "Arm & Hammer" },
  { id: "4", name: "Purex" },
  { id: "5", name: "Bounce" },
];

export default function Home() {
  const navigation = useNavigation();
  const { userDetails } = useAuth();
  const [notiCount, setNotiCount] = useState({ count: 1 });

  const fetchLaundryServices = useCallback(async () => {
    const response = await getLaundryServices(userDetails.storeId);
    return response.data;
  }, [userDetails.storeId]);

  const {
    data: servicesData,
    loading,
    error,
    setIsPolling,
  } = usePolling(fetchLaundryServices, 10000);

  useFocusEffect(
    useCallback(() => {
      setIsPolling(true);

      return () => {
        setIsPolling(false);
      };
    }, [])
  );

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
        isExpanded={!!expandedItems[item.service_id]}
        onToggle={() => toggleExpanded(item.service_id)}
      />
    );
  };

  console.log(servicesData);

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
              <Text style={styles.staffName}>{userDetails.fullname}</Text>
              <Text style={styles.storeName}>
                {userDetails.header_address}, {userDetails.sub_province},{" "}
                {userDetails.sub_city}{" "}
              </Text>
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
        {/* <View style={styles.carouselContainer}>
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
        </View> */}

        {/* Services List */}
        <View style={styles.listContainer}>
          <FlatList
            data={servicesData}
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
  },
  sub_add: {
    fontFamily: fonts.Medium,
    fontSize: 12,
    color: COLORS.white,
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
    backgroundColor: COLORS.error,
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
    paddingVertical: 20,
    paddingBottom: 30,
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
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
});
