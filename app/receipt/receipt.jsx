import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import logo from "../../assets/images/logo_small.png";
import useAuth from "../context/AuthContext";
import usePolling from "../../hooks/usePolling";
import { getReceipt } from "../../data/api/getApi";
import { formatDateNow } from "../../constants/method";

export default function Receipt() {
  const route = useRoute();
  const { userDetails } = useAuth();
  const navigation = useNavigation();
  const { assignment_id, base_price, payment_method, service_name } =
    route.params;

  const fetchReceipt = useCallback(async () => {
    const response = await getReceipt(assignment_id);
    return response.data;
  }, [assignment_id]);

  const {
    data: receipt,
    loading,
    error,
    setIsPolling,
  } = usePolling(fetchReceipt, 50000);

  useFocusEffect(
    useCallback(() => {
      setIsPolling(true);

      return () => {
        setIsPolling(false);
      };
    }, [])
  );

  const relatedItems = receipt?.related_items || {
    item_ids: [],
    item_names: [],
    item_prices: [],
    quantities: [],
    related_item_totals: [],
  };

  // Example usage:
  const { item_ids, item_names, item_prices, quantities, related_item_totals } =
    relatedItems;

  // const relatedItems = [
  //   { itemName: "Laundry Detergent", quantity: 1, amount: "₱50" },
  //   { itemName: "Fabric Softener", quantity: 1, amount: "₱30" },
  // ];

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        <View style={styles.bottomContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.breakdownContainer}>
              {/* Store Logo and Name */}
              <View style={styles.storeHeader}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.storeName}>
                  Lizaso <Text style={styles.laundryHub}>Laundry Hub</Text>
                </Text>
              </View>

              {/* Customer and Payment Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Customer Name: </Text>
                  {userDetails.fullname}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Payment Method: </Text>
                  {payment_method}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Date: </Text>
                  {formatDateNow()}
                </Text>
              </View>

              {/* Service Type, Weight, Amount */}
              <View style={styles.serviceContainer}>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceHeader}>Service Type</Text>
                  <Text style={styles.serviceHeader}>Weight</Text>
                  <Text style={styles.serviceHeader}>Amount</Text>
                </View>
                <View style={styles.serviceRow}>
                  <View>
                    <Text style={styles.serviceText}>{service_name}</Text>
                    <Text style={styles.basePrice}>
                      Base Price: ₱{base_price}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.serviceText}>{receipt.weight}kg</Text>
                  </View>

                  <Text style={styles.serviceText}>
                    ₱{receipt.base_total_amount}
                  </Text>
                </View>
              </View>

              {/* Related Items */}
              <View style={styles.relatedItemsContainer}>
                <Text style={styles.relatedItemsTitle}>Related Items</Text>
                <View style={styles.relatedItemsRow}>
                  <Text style={styles.relatedItemsHeader}>Item Name</Text>
                  <Text style={styles.relatedItemsHeader}>Quantity</Text>
                  <Text style={styles.relatedItemsHeader}>Amount</Text>
                </View>

                {/* Extract related items data */}
                {receipt?.related_items?.item_names?.length > 0 ? (
                  receipt.related_items.item_names.map((name, index) => (
                    <View style={styles.relatedItemsRow} key={index}>
                      <Text style={styles.relatedItemsText}>{name}</Text>
                      <Text style={styles.relatedItemsText}>
                        {receipt.related_items.quantities[index]}
                      </Text>
                      <Text style={styles.relatedItemsText}>
                        {receipt.related_items.item_prices[index]}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noItemsText}>
                    No related items available
                  </Text>
                )}

                {/* {receipt.related_items.length > 0 ? (
                  item_names.map((name, index) => (
                    <View style={styles.relatedItemsRow} key={index}>
                      <Text style={styles.relatedItemsText}>{name}</Text>
                      <Text style={styles.relatedItemsText}>
                        {quantities[index]}
                      </Text>
                      <Text style={styles.relatedItemsText}>
                        {item_prices[index]}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noItemsText}>
                    No related items available
                  </Text>
                )} */}
              </View>

              {/* Total Amount */}
              <View style={styles.totalAmountContainer}>
                <Text style={styles.totalAmountText}>
                  Total Amount: ₱{receipt.final_total}
                </Text>
                <Text style={styles.thankYouText}>
                  Thank you for your business!
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Download Receipt */}
          <TouchableOpacity style={styles.proceedButton}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="download"
                size={20}
                color={COLORS.white}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.proceedButtonText}>Download Receipt</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  breakdownContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginBottom: 20,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  storeName: {
    fontFamily: fonts.Bold,
    fontSize: 20,
    color: COLORS.secondary,
    marginLeft: 10,
  },
  laundryHub: {
    fontFamily: fonts.SemiBold,
    color: COLORS.primary,
  },
  detailsContainer: {
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailText: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: 5,
  },
  boldText: {
    fontFamily: fonts.SemiBold,
  },
  serviceContainer: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  serviceHeader: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: COLORS.text,
  },
  serviceText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.primary,
  },
  basePrice: {
    fontFamily: fonts.Regular,
    fontSize: 10,
    color: COLORS.primary,
    textAlign: "center",
  },
  relatedItemsContainer: {
    marginVertical: 10,
  },
  relatedItemsTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 5,
  },
  relatedItemsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  relatedItemsHeader: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: COLORS.textDark,
  },
  noItemsText: {
    marginTop: 10,
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.primary,
    textAlign: "center",
  },
  totalAmountContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  totalAmountText: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: COLORS.secondary,
  },
  thankYouText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 5,
  },
  relatedItemsText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.textDark,
  },
  proceedButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  proceedButtonText: {
    fontFamily: fonts.Bold,
    color: COLORS.white,
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginVertical: 15,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 20,
//     position: "relative",
//   },
//   backButton: {
//     position: "absolute",
//     left: 20,
//   },
//   headerTitle: {
//     marginLeft: 20,
//     fontSize: 18,
//     fontFamily: fonts.Bold,
//     color: COLORS.white,
//   },
//   bottomContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     justifyContent: "space-between",
//     paddingBottom: 20,
//   },
//   breakdownContainer: {
//     backgroundColor: COLORS.background,
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 10,
//     marginBottom: 20,
//   },
//   serviceTitle: {
//     fontFamily: fonts.Bold,
//     fontSize: 18,
//     marginBottom: 5,
//     color: COLORS.primary,
//   },
//   servicePrice: {
//     fontFamily: fonts.Bold,
//     fontSize: 24,
//     color: COLORS.primary,
//     textAlign: "center",
//   },

//   breakdownRow: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   multiplicationSign: {
//     fontFamily: fonts.SemiBold,
//     fontSize: 20,
//     color: COLORS.error,
//   },
//   laundryWeightLabel: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.primary,
//     textAlign: "center",
//   },
//   breakdownLabel: {
//     fontFamily: fonts.Bold,
//     fontSize: 16,
//     color: COLORS.primary,
//   },
//   breakdownValue: {
//     fontFamily: fonts.Bold,
//     fontSize: 16,
//     color: COLORS.primary,
//   },
//   breakdownValueTotalCost: {
//     fontFamily: fonts.Bold,
//     fontSize: 20,
//     color: COLORS.secondary,
//   },
//   itemsUsedLabel: {
//     fontFamily: fonts.Bold,
//     fontSize: 16,
//     color: COLORS.primary,
//   },
//   itemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 3,
//   },
//   itemLabel: {
//     fontFamily: fonts.Regular,
//     fontSize: 14,
//     color: COLORS.primary,
//   },
//   itemPrice: {
//     fontFamily: fonts.Medium,
//     fontSize: 14,
//     color: COLORS.primary,
//   },
//   paymentMethodsContainer: {
//     marginBottom: 20,
//   },
//   paymentMethodTitle: {
//     fontFamily: fonts.Bold,
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   paymentMethodButton: {
//     paddingVertical: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   selected: {
//     backgroundColor: COLORS.primary,
//   },
//   paymentMethodText: {
//     fontFamily: fonts.Regular,
//     color: COLORS.textDark,
//   },
//   outlined: {
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.white,
//     borderRadius: 10,
//     paddingVertical: 15,
//     marginBottom: 10,
//     alignItems: "center",
//   },

//   outlinedText: {
//     fontFamily: fonts.SemiBold,
//     color: COLORS.primary,
//   },

//   selected: {
//     backgroundColor: COLORS.primary,
//     borderWidth: 0,
//   },

//   selectedText: {
//     color: COLORS.white,
//   },

//   proceedButton: {
//     backgroundColor: COLORS.secondary,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   proceedButtonText: {
//     fontFamily: fonts.Bold,
//     color: COLORS.white,
//     fontSize: 16,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//     marginVertical: 15,
//   },
// });

{
  /* <Text style={styles.serviceTitle}>{breakdown.service}</Text>
              <View style={styles.breakdownRow}>
                <Text style={styles.servicePrice}>
                  {breakdown.servicePrice}
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.multiplicationSign}>X</Text>
                <Text style={styles.breakdownValue}>{breakdown.weight} kg</Text>
              </View>
              <Text style={styles.laundryWeightLabel}>Laundry Weight</Text>

              <View style={styles.divider} />

              <Text style={styles.itemsUsedLabel}>Items Used:</Text>
              {breakdown.itemsUsedWithPrice.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemLabel}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              ))}
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Total Cost</Text>
                <Text style={styles.breakdownValueTotalCost}>
                  {breakdown.totalCost}
                </Text>
              </View> */
}
