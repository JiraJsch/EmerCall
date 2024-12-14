import { StyleSheet, Dimensions, View } from "react-native";
import GradientBackground from "./GredientBackground";
import React, { ReactNode, createContext, useContext } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface BackgroundProviderProps {
  children: ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({
  children,
}) => {
  const theme = useContext(themeContext);

  return theme.themeValue === "dark" ? (
    <View style={{ backgroundColor: "#000", flex: 1 }}>{children}</View>
  ) : theme.themeValue === "light" ? (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>{children}</View>
  ) : (
    <GradientBackground>{children}</GradientBackground>
  );
};

export const theme = {
  default: {
    textcolor: "#fff",
    backgroundColor: "#000",
    tabBarColor: "#222",
    tabBarContentColor: "#fff",
    tabBarContnentFocusedColor: "#673ab7",
    buttonColor: "#000",
    buttonContentColor: "#fff",
    cardColorPrimary: "#ddd",
    cardContentColorPrimary: "#000",
    cardColorSecondary: "#aaa",
    cardContentColorSecondary: "#000",
    themeValue: "default" as ThemeValue,
  },
  dark: {
    textcolor: "#fff",
    backgroundColor: "#000",
    tabBarColor: "#222",
    tabBarContentColor: "#fff",
    tabBarContnentFocusedColor: "#673ab7",
    buttonColor: "#fff",
    buttonContentColor: "#000",
    cardColorPrimary: "#444",
    cardContentColorPrimary: "#fff",
    cardColorSecondary: "#fff",
    cardContentColorSecondary: "#000",
    themeValue: "dark" as ThemeValue,
  },
  light: {
    textcolor: "#000",
    backgroundColor: "#fff",
    tabBarColor: "#eee",
    tabBarContentColor: "#000",
    tabBarContnentFocusedColor: "#673ab7",
    buttonColor: "#000",
    buttonContentColor: "#fff",
    cardColorPrimary: "#ccc",
    cardContentColorPrimary: "#000",
    cardColorSecondary: "#aaa",
    cardContentColorSecondary: "#000",
    themeValue: "light" as ThemeValue,
  },
};

export const themeContext = createContext(theme.default);

const styleUniform = StyleSheet.create({
  container: {
    padding: 32,
    gap: 8,
  },
  headerText: {
    alignSelf: "center",
    lineHeight: 40,
    height: 42,
    fontSize: 32,
    fontWeight: "bold",
  },
  subHeaderText: {
    lineHeight: 40,
    fontSize: 20,
    fontWeight: "bold",
  },
  contentText: {
    height: 24,
    fontSize: 16,
    fontWeight: "regular",
  },
  PageHeadText: {
    fontSize: 24,
    width: windowWidth * 0.7,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
  },
  buttonText: {
    textAlign: "center",
  },
  mainImage: {
    width: windowWidth * 0.8,
    height: 200,
    alignSelf: "center",
  },
  subLogoImage: {
    width: windowWidth * 0.2,
    height: 50,
    alignSelf: "flex-end",
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#dddddd",
    marginHorizontal: 8,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  numberText: {
    fontSize: 24,
  },
  map: {
    width: "100%",
    height: windowHeight / 2,
  },
});

export default styleUniform;
