import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { LinearGradient } from "expo-linear-gradient";

export default function Track() {
  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text
          style={{ fontSize: 40, fontFamily: fonts.Regular, marginBottom: 16 }}
        ></Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
