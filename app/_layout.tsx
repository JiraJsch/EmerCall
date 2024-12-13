import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import { theme, themeContext } from "@/components/StyleUniform";

import AsyncStorage from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [themeValue, setThemeValue] = useState<ThemeValue>("default");

  const storeTheme = async (themeValue: ThemeValue) => {
    try {
      await AsyncStorage.setItem("theme", themeValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme") as ThemeValue;
      if (theme) {
        setThemeValue(theme);
      } else {
        storeTheme("default");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      "ChangeTheme",
      (themeValue) => {
        setThemeValue(themeValue);
        storeTheme(themeValue);
      }
    );
    return () => {
      EventRegister.removeEventListener(listener as string);
    };
  }, [themeValue]);

  return (
    <themeContext.Provider
      value={
        themeValue === "dark"
          ? theme.dark
          : themeValue === "light"
          ? theme.light
          : theme.default
      }
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="map-search"
          options={{
            headerTitle: "ค้นหาแผนที่",
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
      </Stack>
    </themeContext.Provider>
  );
}

export default RootLayout;