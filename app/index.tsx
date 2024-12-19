import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, Image } from "react-native";
import { router, SplashScreen } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import styleUniform from "@/components/StyleUniform";

const appInit = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { // setTimeout ensures the rendering goes first, preventing error of navigation before rendering
      router.replace("/(tabs)/home");
      SplashScreen.hideAsync();
      setLoading(false);
    }, 1);
  }, []);

  if (loading) {
    return (
      <GradientBackground
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={require("@/assets/images/logo-wording.png")}
          style={styleUniform.mainImage}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </GradientBackground>
    );
  }

  return null; // The page is redirecting, so render nothing after redirection
};

export default appInit;
