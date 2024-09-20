import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import TabBarButton from "./TabBarButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function TabBar({ state, descriptors, navigation }) {
  const primaryColor = "#5787C8";
  const whiteColor = "#FFFFFF";
  const greyColor = "#737373";

  // Correcting dimensions state
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  // Change state.route.length to state.routes.length
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
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : whiteColor}
            label={label}
          />
        );
      })}
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
    backgroundColor: "#5787C8",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
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

// export default function TabBar({ state, descriptors, navigation }) {
//   const primaryColor = "#5787C8";
//   const whiteColor = "#FFFFFF";
//   const greyColor = "#737373";

//   const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
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
//         style={{
//           position: "absolute",
//           backgroundColor: "#723FEB",
//           borderRadius: 30,
//           marginHorizontal: 12,
//           height: dimensions.height - 15,
//           width: buttonWidth - 25,
//         }}
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
//             color={isFocused ? primaryColor : greyColor}
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
//     bottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     marginHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 25,
//     borderCurve: "continuous",
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

// <TouchableOpacity
//   key={route.name}
//   style={styles.tabbarItem}
//   accessibilityRole="button"
//   accessibilityState={isFocused ? { selected: true } : {}}
//   accessibilityLabel={options.tabBarAccessibilityLabel}
//   testID={options.tabBarTestID}
//   onPress={onPress}
//   onLongPress={onLongPress}
// >
//   {icons[route.name]({
//     color: isFocused ? primaryColor : greyColor,
//   })}
//   <Text
//     style={{
//       color: isFocused ? primaryColor : greyColor,
//       fontSize: 11,
//     }}
//   >
//     {label}
//   </Text>
// </TouchableOpacity>

// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
// import { AntDesign } from "@expo/vector-icons";

// export default function TabBar({ state, descriptors, navigation }) {
//   const primaryColor = "#5787C8";
//   const whiteColor = "#FFFFFF";
//   const greyColor = "#737373";

//   const icons = {
//     home: (props) => <AntDesign name="home" size={26} {...props} />,
//     explore: (props) => <AntDesign name="search1" size={26} {...props} />,
//     payment: (props) => <AntDesign name="creditcard" size={26} {...props} />,
//     profile: (props) => <AntDesign name="user" size={26} {...props} />,
//   };

//   return (
//     <View style={styles.tabbar}>
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
//           <TouchableOpacity
//             key={route.name}
//             style={styles.tabbarItem}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//           >
//             {icons[route.name]({
//               color: isFocused ? primaryColor : greyColor,
//             })}
//             <Text
//               style={{
//                 color: isFocused ? primaryColor : greyColor,
//                 fontSize: 11,
//               }}
//             >
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabbar: {
//     position: "absolute",
//     bottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     marginHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 25,
//     borderCurve: "continuous",
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

// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
// import { AntDesign } from "@expo/vector-icons";

// export default function TabBar({ state, descriptors, navigation }) {
//   const primaryColor = "#5787C8";
//   const greyColor = "#737373";

//   const icons = {
//     home: (props) => <AntDesign name="home" size={26} {...props} />,
//     explore: (props) => <AntDesign name="search1" size={26} {...props} />,
//     payment: (props) => <AntDesign name="creditcard" size={26} {...props} />,
//     profile: (props) => <AntDesign name="user" size={26} {...props} />,
//   };

//   return (
//     <View style={styles.tabbar}>
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
//           <TouchableOpacity
//             key={route.name}
//             style={styles.tabbarItem}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//           >
//             {icons[route.name]({
//               color: isFocused ? { primaryColor } : { greyColor },
//             })}
//             <Text
//               style={{ color: isFocused ? { primaryColor } : { greyColor } }}
//             >
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabbar: {
//     position: "absolute",
//     bottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     marginHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 25,
//     borderCurve: "continuous",
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 10 },
//     shadowRadius: 10,
//     shadowOpacity: 0.1,
//   },
//   tabbarItem: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";

// import TabBarButton from "./TabBarButton";

// export default function TabBar({ state, descriptors, navigation }) {
//   const primaryColor = "#5787C8";
//   const greyColor = "#737373";

//   return (
//     <View style={styles.tabbar}>
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
//             style={styles.tabbarItem}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             isFocused={isFocused}
//             routeName={route.name}
//             color={isFocused ? primaryColor : greyColor}
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
//     backgroundColor: "white",
//     marginHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 25,
//     borderCurve: "continuous",
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

// return (
//   <TouchableOpacity
//     key={route.name}
//     style={styles.tabbarItem}
//     accessibilityRole="button"
//     accessibilityState={isFocused ? { selected: true } : {}}
//     accessibilityLabel={options.tabBarAccessibilityLabel}
//     testID={options.tabBarTestID}
//     onPress={onPress}
//     onLongPress={onLongPress}
//   >
//     {icons[route.name]({ color: isFocused ? primaryColor : greyColor })}
//     <Text
//       style={{
//         color: isFocused ? primaryColor : greyColor,
//         fontSize: 11,
//       }}
//     >
//       {label}
//     </Text>
//   </TouchableOpacity>
// );
