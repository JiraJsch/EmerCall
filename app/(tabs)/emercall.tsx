import GradientBackground from "@/components/GredientBackground";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

const goToCall: Function = (phoneNumber: string) => {
  return (
    Linking.openURL(`tel:${phoneNumber}`)
  );
}

const CallNumber = (hotLineNumber: number) => {
  if (hotLineNumber === 1669) {
    alert("You're calling an Ambulance service (" + hotLineNumber + ")");
  } else if (hotLineNumber === 191) {
    alert("You're calling an Police Unit (" + hotLineNumber + ")");
  } else if (hotLineNumber === 199) {
    alert("You're calling an Firefighter Unit (" + hotLineNumber + ")");
  }
  goToCall(hotLineNumber);
}

const EmercallPage = () => {
  return (
    <GradientBackground>
      <View style={styles.gap}>
        <Text>What kind of Emergency you needed to call?</Text>
        <TouchableOpacity
          onPress={() => CallNumber(1669)}
          style={styles.button}
        >
          <Text style={styles.text}>Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => CallNumber(191)} style={styles.button}>
          <Text style={styles.text}>Police</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => CallNumber(199)} style={styles.button}>
          <Text style={styles.text}>Firefighter</Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
};

export default EmercallPage;

const styles = StyleSheet.create({
  gap: {
    gap: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#222222",
  },
  text: {
    textAlign: "center",
    color: "white"
  },
});
