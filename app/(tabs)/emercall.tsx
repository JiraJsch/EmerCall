import GradientBackground from "@/components/GredientBackground";
import styleUniform, {
  BackgroundProvider,
  themeContext,
} from "@/components/StyleUniform";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@react-navigation/native";

const goToCall: Function = (phoneNumber: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};

const CallNumber = (hotLineNumber: number) => {
  if (hotLineNumber === 1669) {
    alert("You're calling an Ambulance service (" + hotLineNumber + ")");
  } else if (hotLineNumber === 191) {
    alert("You're calling an Police Unit (" + hotLineNumber + ")");
  } else if (hotLineNumber === 199) {
    alert("You're calling an Firefighter Unit (" + hotLineNumber + ")");
  }
  goToCall(hotLineNumber);
};

const EmercallPage = () => {
  const theme = useContext(themeContext);

  return (
    <BackgroundProvider>
      <View style={{ marginHorizontal: 12, gap: 5 }}>
        <Text style={[styleUniform.subHeaderText, { color: theme.textcolor }]}>
          {"เลือกเบอร์ฉุกเฉินด้านล่างเพื่อโทร"}
        </Text>
        <TouchableOpacity
          onPress={() => CallNumber(1669)}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            {"พยาบาล (ทั่วประเทศ) (1669)"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CallNumber(1646)}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            {"พยาบาล (เฉพาะในกรุงเทพฯ) (1646)"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CallNumber(199)}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            {"ดับเพลิง / เผชิญสัตว์ร้าย (199)"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CallNumber(191)}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            {"ตำรวจ (191)"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CallNumber(192)}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            {"เกิดภัยพิบัติ (192)"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CallNumber(1300)}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            {"บุคคลสูญหาย (1300)"}
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundProvider>
  );
};

export default EmercallPage;
