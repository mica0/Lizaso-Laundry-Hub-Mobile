import {
  Canvas,
  DiffRect,
  rect,
  rrect,
  Path,
  Paint,
  Skia,
} from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import COLORS from "@/constants/colors";
import { fonts } from "../../constants/fonts";

const { width, height } = Dimensions.get("window");
const innerDimension = 300;
const cornerLength = 30; // Length of the corner lines
const cornerThickness = 3; // Thickness of the corner lines

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

const createCornerPath = (x, y, horizontalDirection, verticalDirection) => {
  const path = Skia.Path.Make();
  path.moveTo(x, y);

  if (horizontalDirection === "right") {
    path.lineTo(x + cornerLength, y);
  } else if (horizontalDirection === "left") {
    path.lineTo(x - cornerLength, y);
  }

  path.moveTo(x, y);
  if (verticalDirection === "down") {
    path.lineTo(x, y + cornerLength);
  } else if (verticalDirection === "up") {
    path.lineTo(x, y - cornerLength);
  }

  return path;
};

export const Overlay = () => {
  const navigation = useNavigation();

  return (
    <>
      <Canvas
        style={
          Platform.OS === "android"
            ? { flex: 1, padding: 20 }
            : StyleSheet.absoluteFillObject
        }
      >
        {/* Darkened Background */}
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />

        {/* Top-left corner */}
        <Path
          path={createCornerPath(
            width / 2 - innerDimension / 2,
            height / 2 - innerDimension / 2,
            "right",
            "down"
          )}
        >
          <Paint
            color={COLORS.secondary}
            style="stroke"
            strokeWidth={cornerThickness}
          />
        </Path>
        {/* Top-right corner */}
        <Path
          path={createCornerPath(
            width / 2 + innerDimension / 2,
            height / 2 - innerDimension / 2,
            "left",
            "down"
          )}
        >
          <Paint
            color={COLORS.secondary}
            style="stroke"
            strokeWidth={cornerThickness}
          />
        </Path>
        {/* Bottom-left corner */}
        <Path
          path={createCornerPath(
            width / 2 - innerDimension / 2,
            height / 2 + innerDimension / 2,
            "right",
            "up"
          )}
        >
          <Paint
            color={COLORS.secondary}
            style="stroke"
            strokeWidth={cornerThickness}
          />
        </Path>
        {/* Bottom-right corner */}
        <Path
          path={createCornerPath(
            width / 2 + innerDimension / 2,
            height / 2 + innerDimension / 2,
            "left",
            "up"
          )}
        >
          <Paint
            color={COLORS.secondary}
            style="stroke"
            strokeWidth={cornerThickness}
          />
        </Path>
      </Canvas>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Align the QR code within the frame to scan.
        </Text>
      </View>

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
    top: 50,
    left: 20,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  backButtonText: {
    color: COLORS.white,
    fontFamily: fonts.SemiBold,
  },
  instructionsContainer: {
    position: "absolute",
    top: height / 2 + innerDimension / 2 + 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  instructionsText: {
    color: COLORS.white,
    fontFamily: fonts.Regular,
    fontSize: 15,
    textAlign: "center",
  },
});
