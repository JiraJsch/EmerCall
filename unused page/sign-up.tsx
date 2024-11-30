import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import GradientBackground from "@/components/GredientBackground";
import styleUniform from "@/components/StyleUniform";

export default function SignUpScreen() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");

const onSignUpPress = () => {
    console.log("From Sign Up: Let's assume that it is correct for now");
    router.replace("/(tabs)/home");
  }

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              source={require("@/assets/images/logo-wording.png")}
              style={styleUniform.mainImage}
              resizeMode="contain"
            />
            <Text style={styleUniform.headerText}>Sign Up Page</Text>
            <Text style={styleUniform.contentText}>First Name</Text>
            <TextInput
              style={styleUniform.textInput}
              autoCapitalize="none"
              value={firstName}
              keyboardType="default"
              placeholder="สมชาย"
              onChangeText={setFirstName}
            />
            <Text style={styleUniform.contentText}>Last Name</Text>
            <TextInput
              style={styleUniform.textInput}
              autoCapitalize="none"
              value={lastName}
              keyboardType="default"
              placeholder="หมายมั่น"
              onChangeText={setLastName}
            />
            <Text style={styleUniform.contentText}>Phone Number</Text>
            <TextInput
              style={styleUniform.textInput}
              autoCapitalize="none"
              value={phoneNumber}
              keyboardType="numeric"
              placeholder="098-765-4321"
              onChangeText={setPhoneNumber}
            />
            <Text style={styleUniform.contentText}>Password</Text>
            <TextInput
              style={styleUniform.textInput}
              value={password}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <Text style={styleUniform.contentText}>Confirm Password</Text>
            <TextInput
              style={styleUniform.textInput}
              value={confirmPassword}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={setComfirmPassword}
            />
            <TouchableOpacity
              onPress={() => {
                if (confirmPassword !== password) {
                  console.error("Password not match");
                } else {
                  onSignUpPress();
                }
              }}
              style={styleUniform.button}
            >
              <Text style={styleUniform.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    padding: 32,
    justifyContent: "center",
  },
});
