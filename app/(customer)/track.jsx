import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";

export default function Track() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
      <Text
        style={{ fontSize: 40, fontFamily: fonts.Regular, marginBottom: 16 }}
      >
        Explore
      </Text>
    </SafeAreaView>
  );
}
