import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { fonts } from "../../constants/fonts";

export default function Delivery() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
      <Text
        style={{ fontSize: 40, fontFamily: fonts.Regular, marginBottom: 16 }}
      >
        Transaction History
      </Text>
    </SafeAreaView>
  );
}
