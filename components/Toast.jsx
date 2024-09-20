import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Toast = ({ message, visible, onHide, duration = 3000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(onHide);
        }, duration);
      });
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: "10%",
    right: "10%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toastText: {
    color: "white",
    fontSize: 16,
  },
});

export default Toast;
