import { useAuth } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";

const AuthLayout = () => {
    const { isSignedIn } = useAuth();
    return (
      <Stack>
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          redirect={!isSignedIn}          
        />
        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false }}
          redirect={!isSignedIn}
        />
      </Stack>
    );
}