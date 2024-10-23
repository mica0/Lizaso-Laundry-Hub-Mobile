import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler"; // Adjusted to use the correct import for ScrollView
import COLORS from "../../../constants/colors";
import { fonts } from "../../../constants/fonts"; // Make sure to import fonts if used
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Store_Selection() {
  const route = useRoute();
  const navigation = useNavigation();
  const { data } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Select a store</Text>
            <Text style={styles.subtitle}>
              Enter your address and select a store for quick laundry service!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  textContainer: {
    marginVertical: 10,
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontFamily: fonts.Bold,
    marginVertical: 12,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 10,
  },
  backText: {
    fontSize: 18,
    marginLeft: 8,
    color: COLORS.secondary,
    fontFamily: fonts.SemiBold,
  },
});
