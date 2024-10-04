import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import StaffTabBarButton from "./staffTabBarButton";

export default function StaffTabBar({ state, descriptors, navigation }) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const handleFloatingButtonPress = () => {
    navigation.navigate("scanner/qrscan", {});
  };

  return (
    <View onLayout={onTabBarLayout} style={styles.tabbar}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <StaffTabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? COLORS.secondary : COLORS.white}
            label={label}
          />
        );
      })}

      {/* Floating Button */}
      <View style={styles.centerButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleFloatingButtonPress}
        >
          <MaterialCommunityIcons
            name="data-matrix-scan"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  centerButtonContainer: {
    position: "absolute",
    top: -40, // Adjust to create the floating effect
    left: "50%",
    transform: [{ translateX: -30 }], // Center horizontally
    zIndex: 1, // Ensure the button is above the tab bar
  },
  floatingButton: {
    backgroundColor: COLORS.error,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 }, // Increase the vertical offset
    shadowOpacity: 0.5, // Increase the opacity for a more pronounced shadow
    shadowRadius: 10, // Increase the radius for a softer shadow
  },
});

// import { View, Text, StyleSheet } from "react-native";
// import React, { useState } from "react";
// import TabBarButton from "./TabBarButton";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";

// export default function StaffTabBar({ state, descriptors, navigation }) {
//   const primaryColor = "#5787C8";
//   const whiteColor = "#FFFFFF";
//   const greyColor = "#737373";

//   // Correcting dimensions state
//   const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

//   // Change state.route.length to state.routes.length
//   const buttonWidth = dimensions.width / state.routes.length;

//   const onTabBarLayout = (e) => {
//     setDimensions({
//       height: e.nativeEvent.layout.height,
//       width: e.nativeEvent.layout.width,
//     });
//   };

//   const tabPositionX = useSharedValue(0);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: tabPositionX.value }],
//     };
//   });

//   return (
//     <View onLayout={onTabBarLayout} style={styles.tabbar}>
//       <Animated.View
//         style={[
//           animatedStyle,
//           {
//             position: "absolute",
//             backgroundColor: "white",
//             borderRadius: 30,
//             marginHorizontal: 12,
//             height: dimensions.height - 15,
//             width: buttonWidth - 25,
//           },
//         ]}
//       />
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           tabPositionX.value = withSpring(buttonWidth * index, {
//             duration: 1500,
//           });
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: "tabLongPress",
//             target: route.key,
//           });
//         };

//         return (
//           <TabBarButton
//             key={route.name}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             isFocused={isFocused}
//             routeName={route.name}
//             color={isFocused ? primaryColor : whiteColor}
//             label={label}
//           />
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabbar: {
//     position: "absolute",
//     bottom: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#5787C8",
//     marginHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 30,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 10 },
//     shadowRadius: 10,
//     shadowOpacity: 0.1,
//   },
//   tabbarItem: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 4,
//   },
// });
