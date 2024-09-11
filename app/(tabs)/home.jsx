import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function home() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 40, fontFamily: "poppins-regular" }}>home</Text>
    </SafeAreaView>
  //    <View>
  //    <Text style={{ fontSize: 40, fontFamily: "poppins-regular" }}>home</Text>
  //  </View>
  );
}

