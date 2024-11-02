import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Login Page" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerTitle: "Sign Up Page" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayout;
