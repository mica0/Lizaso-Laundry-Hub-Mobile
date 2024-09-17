import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { icons } from "../assets/icons";

export default function TabBarButton(props) {
  const { isFocused, label, routeName, color } = props;
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);
    return { transform: [{ scale: scaleValue }], top };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]({
          color,
        })}
      </Animated.View>
      <Animated.Text
        style={
          ({
            color,
            fontSize: 11,
          },
          animatedTextStyle)
        }
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

// import React, { useEffect } from "react";
// import { View, Text, Pressable, StyleSheet } from "react-native";
// import Animated, {
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
//   interpolate,
// } from "react-native-reanimated";
// import { icons } from "../assets/icons";

// export default function TabBarButton(props) {
//   const { isFocused, label, routeName, color } = props;
//   const scale = useSharedValue(0);
//   useEffect(() => {
//     scale.value = withSpring(
//       typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
//       { duration: 350 }
//     );
//   }, [scale, isFocused]);

//   const animatedIconStyle = useAnimatedStyle(() => {
//     const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
//     const top = interpolate(scale.value, [0, 1], [0, 8]);
//     return { transform: [{ scale: scaleValue }], top };
//   });

//   const animatedTextStyle = useAnimatedStyle(() => {
//     const opacity = interpolate(scale.value, [0, 1], [1, 0]);
//     return { opacity };
//   });

//   return (
//     <Pressable {...props} style={styles.container}>
//       <Animated.View style={[animatedIconStyle]}>
//         {icons[routeName]({
//           color,
//         })}
//       </Animated.View>
//       <Animated.Text
//         style={
//           ({
//             color,
//             fontSize: 11,
//           },
//           animatedTextStyle)
//         }
//       >
//         {label}
//       </Animated.Text>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 4,
//   },
// });
