import GradientBackground from "@/components/GredientBackground";
import styleUniform from "@/components/StyleUniform";
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
        <Text style={styleUniform.subHeaderText}>{"ต้องการเรียกหน่วยงานใด?"}</Text>
        <TouchableOpacity
          onPress={() => CallNumber(1669)}
          style={styleUniform.button}
        >
          <Text style={styleUniform.buttonText}>{"รถพยาบาล (1669)"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => CallNumber(191)} style={styleUniform.button}>
          <Text style={styleUniform.buttonText}>{"ตำรวจ (191)"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => CallNumber(199)} style={styleUniform.button}>
          <Text style={styleUniform.buttonText}>{"หน่วยดับเพลิง (199)"}</Text>
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
});
