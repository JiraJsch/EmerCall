import GradientBackground from "@/components/GredientBackground";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { TextInput } from "react-native-paper";

const NewUserValidation = (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) => {
  if(!(firstName && lastName && phoneNumber && password && confirmPassword)){
    alert("Some user information missing. Please make sure you fill up the mandatory information.")
    return false;
  }
  if(password !== confirmPassword){
    alert("Incorrect Password. Both password are not the same.");
    return false;
  }
  return true;
}

const SignUpPage = () => {
  const router = useRouter();

  const handleSignUp = (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
  ) => {
    if (
      NewUserValidation(
        firstName,
        lastName,
        phoneNumber,
        password,
        confirmPassword
      )
    ) {
      router.dismissAll();
      console.log("Signed Up Successfully!");
    }
  };

  const [firstName, onChangeFirstName] = React.useState("");
  const [lastName, onChangeLastName] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [Email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up Page</Text>
        <Text>First Name</Text>
        <TextInput
          onChangeText={onChangeFirstName}
          value={firstName}
          placeholder="สมชาย"
        />
        <Text>Last Name</Text>
        <TextInput
          onChangeText={onChangeLastName}
          value={lastName}
          placeholder="หมายมั่น"
        />
        <Text>Phone Number</Text>
        <TextInput
          onChangeText={onChangePhoneNumber}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="098-765-4321"
        />
        <Text>E-mail (Optional)</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={Email}
          placeholder="Mail@inbox.com"
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          placeholder="********"
        />
        <Text>ConFirm Password</Text>
        <TextInput
          onChangeText={onChangeConfirmPassword}
          value={confirmPassword}
          placeholder="********"
        />
        <Button
          title="Sign Up"
          onPress={() => {
            handleSignUp(
              firstName,
              lastName,
              phoneNumber,
              password,
              confirmPassword
            );
          }}
        />
      </View>
    </GradientBackground>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
