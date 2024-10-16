import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";

export default function Payment() {
  // Sample payment history data
  const paymentHistory = [
    {
      id: "1",
      date: "2024-10-01",
      amount: "$20.00",
      status: "Completed",
    },
    {
      id: "2",
      date: "2024-09-25",
      amount: "$15.00",
      status: "Pending",
    },
    {
      id: "3",
      date: "2024-09-10",
      amount: "$30.00",
      status: "Completed",
    },
    {
      id: "4",
      date: "2024-08-30",
      amount: "$25.00",
      status: "Failed",
    },
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentDate}>Date: {item.date}</Text>
      <Text style={styles.paymentAmount}>Amount: {item.amount}</Text>
      <Text
        style={[
          styles.paymentStatus,
          item.status === "Completed"
            ? styles.statusCompleted
            : item.status === "Pending"
            ? styles.statusPending
            : styles.statusFailed,
        ]}
      >
        Status: {item.status}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Payment History</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.listContainer}>
            <FlatList
              data={paymentHistory}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselTitle: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    flex: 1,
    marginBottom: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  paymentItem: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentDate: {
    fontSize: 16,
    fontFamily: fonts.SemiBold,
    color: COLORS.primary,
  },
  paymentAmount: {
    fontSize: 16,
    fontFamily: fonts.SemiBold,
    color: COLORS.text3,
    marginBottom: 5,
  },
  paymentStatus: {
    fontSize: 16,
    fontFamily: fonts.Bold,
  },
  statusCompleted: {
    color: "green",
  },
  statusPending: {
    color: "orange",
  },
  statusFailed: {
    color: "red",
  },
});
