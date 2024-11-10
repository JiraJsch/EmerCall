import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import GradientBackground from "@/components/GredientBackground";
import styleUniform from "@/components/StyleUniform";

export default function SignUpScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [OTPCode, setCode] = useState("");
  const [loading, setLoading] = useState(false);

const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }
    try {
      await signUp.create({
        firstName,
        lastName,
        phoneNumber: "66" + phoneNumber.slice(1),
        password,
      })
      await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' })
      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code: OTPCode,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      
    } catch (err: any) {
      alert(err.error[0].message);
    } finally {
      setLoading(false);
      router.replace("/(auth)/home");
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ensure proper behavior on iOS and Android
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              source={require("@/assets/images/logo-wording.png")}
              style={styleUniform.mainImage}
              resizeMode="contain"
            />
            <Text style={styleUniform.headerText}>Sign Up Page</Text>
            {!pendingVerification && (
              <>
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
                  <Text style={styleUniform.buttonText}>
                    Verify Phone Number
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {pendingVerification && (
              <>
                <Text style={styleUniform.contentText}>OTP</Text>
                <TextInput
                  style={styleUniform.textInput}
                  value={OTPCode}
                  placeholder="000000"
                  onChangeText={setCode}
                />
                <TouchableOpacity
                  onPress={onPressVerify}
                  style={styleUniform.button}
                >
                  <Text style={styleUniform.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
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
