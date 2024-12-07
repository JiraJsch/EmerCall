import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import { theme, themeContext } from "@/components/StyleUniform";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [themeValue, setThemeValue] = useState<ThemeValue>("default");

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (themeValue) => {
      setThemeValue(themeValue);
    });
    return () => {
      EventRegister.removeEventListener(listener as string);
    }
  }, [themeValue])

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
