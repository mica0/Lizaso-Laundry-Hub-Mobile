import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "expo-router";
import COLORS from "@/constants/colors";
import { fonts } from "../../constants/fonts";

const { width, height } = Dimensions.get("window");
const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,
  50
);

export const Overlay = () => {
  const navigation = useNavigation();

  return (
    <>
      <Canvas
        style={
          Platform.OS === "android"
            ? { flex: 1 }
            : StyleSheet.absoluteFillObject
        }
      >
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
      </Canvas>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50, // Adjust position as needed
    left: 20, // Adjust position as needed
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  backButtonText: {
    color: COLORS.white,
    fontFamily: fonts.SemiBold,
  },
});
