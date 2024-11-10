import GradientBackground from "@/components/GredientBackground";
import styleUniform from "@/components/StyleUniform";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";


const login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn, setActive, isLoaded } = useSignIn();

    const onSignInPress = React.useCallback(async () => {
      if (!isLoaded) {
        return;
      }
      try {
        const signInAttempt = await signIn.create({
          identifier: ("66" + phoneNumber.slice(1)),
          password,
        });
        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/(auth)/home");
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (err: any) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2));
      }
    }, [isLoaded, phoneNumber, password]);

    return (
      <GradientBackground>
        {//signIn && router.replace("/(auth)/(tabs)/home")!
        }
        <View>
          <View style={styleUniform.container}>
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
                onPress={() => router.replace("/(public)/sign-up")}
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
          </View>
        </View>
      </GradientBackground>
    );
}

export default login;
