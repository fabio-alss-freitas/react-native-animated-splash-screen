import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const _solidBackground = (logoOpacity, backgroundColor) => [
  logoOpacity,
  StyleSheet.absoluteFill,
  { backgroundColor: backgroundColor || null },
];

export const _dynamicImageBackground = (
  imageScale,
  logoOpacity,
  backgroundColor
) => [
  imageScale,
  logoOpacity,
  {
    ...StyleSheet.absoluteFill,
    width,
    height,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    tintColor: backgroundColor || null,
  },
];

export const _dynamicLogoStyle = (
  logoScale,
  logoOpacity,
  logoWidth,
  logoHeight
) => [
  logoScale,
  logoOpacity,
  {
    width: logoWidth || 150,
    height: logoHeight || 150,
  },
];

export default {
  container: {
    flex: 1,
  },
  containerGlue: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  flex: {
    flex: 1,
  },
  logoStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
};
