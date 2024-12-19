import GradientBackground from "@/components/GradientBackground";
import styleUniform from "@/components/StyleUniform";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Pressable, Keyboard } from "react-native";

const login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPress = () => {
    console.log("From Login: Let's assume that it is correct for now.");
    router.replace("/(tabs)/home")
    }

    return (
      <GradientBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Pressable
            onPress={() => Keyboard.dismiss()}
            style={styleUniform.container}
          >
              <Image
                source={require("@/assets/images/logo-wording.png")}
                style={styleUniform.mainImage}
                resizeMode="contain"
              />
              <Text style={styleUniform.headerText}>Sign In Page</Text>
              <Text style={styleUniform.contentText}>Phone Number</Text>
              <TextInput
                style={styleUniform.textInput}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                value={phoneNumber}
                keyboardType="phone-pad"
                placeholder="098-765-4321"
                placeholderTextColor="#000"
              />
              <Text style={styleUniform.contentText}>Password</Text>
              <TextInput
                style={styleUniform.textInput}
                onChangeText={(password) => setPassword(password)}
                value={password}
                placeholder="********"
                placeholderTextColor="#000"
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={onSignInPress}
                style={styleUniform.button}
              >
                <Text style={styleUniform.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    height: 20,
                  }}
                >
                  {"Don't have an account? Sign up "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.replace("/sign-up")}
                  style={{ justifyContent: "center", height: 20 }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "yellow",
                      height: 20,
                    }}
                  >
                    here.
                  </Text>
                </TouchableOpacity>
              </View>
          </Pressable>
        </KeyboardAvoidingView>
      </GradientBackground>
    );
}

export default login;
