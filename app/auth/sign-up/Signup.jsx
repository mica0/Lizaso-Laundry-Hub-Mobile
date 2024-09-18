import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function index() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.primary,
            }}
          >
            Create Account
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.primary }}>
            Connect with your friend today!
          </Text>
        </View>

        {/* MOBILE NUMBER */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mobile Number
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+63"
              placeholderTextColor={COLORS.primary}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
              }}
            />
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              style={{ width: "80%" }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Username
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor={COLORS.grey}
              keyboardType="email"
              style={{ width: "100%" }}
            />
          </View>
        </View>

        {/* PASSWORD */}
        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
          Password
        </Text>
        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.primary,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
          }}
        >
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={COLORS.grey}
            secureTextEntry={isPasswordShown}
            style={{ width: "100%" }}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={{ position: "absolute", right: 12 }}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={24} color={COLORS.primary} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
