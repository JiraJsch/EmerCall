import GradientBackground from "@/components/GredientBackground";
import StyleUniform from "@/components/StyleUniform";
import { useRouter } from "expo-router";
import React from "react";

import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";

const LoginPage = () => {
  const router = useRouter();

  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const loginValidation = (phoneNumber:string, password:string) => {
    if(!(phoneNumber && password)){
      alert("Phone Number and Password cannot be Empty.");
      return false;
    }
    return true;
  }
  
  const handleLogin = (phoneNumber:string, password:string) => {
    if (loginValidation(phoneNumber, password)){
        router.push("/(tabs)");
        console.log("Login Successfully!")
    }
  }

  return (
    <GradientBackground>
      <View style={StyleUniform.container}>
        <Image
          source={require("../assets/images/logo-wording.png")}
          style={StyleUniform.mainImage}
          resizeMode="contain"
        />
        <Text style={StyleUniform.headerText}>Log In Page</Text>
        <Text style={StyleUniform.contentText}>Phone Number</Text>
        <TextInput
          onChangeText={onChangePhoneNumber}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="098-765-4321"
        />
        <Text style={StyleUniform.contentText}>Password</Text>
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          placeholder="********"
        />
        <TouchableOpacity
          onPress={() => handleLogin(phoneNumber, password)}
          style={StyleUniform.button}
        >
          <Text style={StyleUniform.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            /*  backgroundColor: "#888888",
            borderRadius: 5,
        */
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            {"New to this app? Sign up "}
          </Text>
          <Pressable
            onPress={() => router.push("/sign-up")}
            style={{ justifyContent: "center" }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "yellow",
              }}
            >
              here.
            </Text>
          </Pressable>
        </View>
      </View>
    </GradientBackground>
  );
};

export default LoginPage;
