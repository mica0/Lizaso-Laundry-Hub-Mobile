import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or wherever you are importing this from
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";

export const ServiceItem = ({ item, isExpanded, onToggle }) => {
  return (
    <View style={styles.serviceItem}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.serviceImage}
      />

      <View style={styles.serviceInfo}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.serviceName}>{item.service_name}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
            <Text style={styles.servicePrice}>PHP {item.default_price}</Text>
            {item.isActive &&
              isExpanded && ( // Show promo details if expanded
                <>
                  <Text style={styles.promoDetails}>
                    Special Promo Details!
                  </Text>
                  <Text style={styles.promoDetails}>
                    Special Promo Details!
                  </Text>
                  <Text style={styles.promoDetails}>
                    Special Promo Details!
                  </Text>
                  <Text style={styles.promoDetails}>
                    Special Promo Details!
                  </Text>
                  <Text style={styles.promoDetails}>
                    Special Promo Details!
                  </Text>
                  <Text style={styles.promoDetails}>
                    Special Promo Details!
                  </Text>
                </>
              )}
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
            }}
          >
            {item.isActive && !isExpanded && (
              <Text style={styles.promoBadge}>Promo</Text>
            )}
            {item.isActive && (
              <TouchableOpacity
                onPress={onToggle}
                style={styles.collapseIconContainer}
              >
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Pressable style={styles.serviceButton}>
          <Text style={styles.buttonText}>Select</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    position: "relative",
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  serviceName: {
    fontFamily: fonts.Bold,
    color: COLORS.primary,
    fontSize: 16,
  },
  serviceDescription: {
    fontFamily: fonts.Medium,
    fontSize: 11,
    color: COLORS.grayMedium,
  },
  servicePrice: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: COLORS.secondary,
  },
  promoBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.error,
    color: COLORS.white,
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  serviceButton: {
    backgroundColor: COLORS.grayMedium,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: fonts.SemiBold,
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
    marginTop: 25,
    marginEnd: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  promoDetails: {
    marginTop: 5,
    fontStyle: "italic",
    color: COLORS.gray,
  },
});
