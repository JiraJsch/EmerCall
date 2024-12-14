import styleUniform, {
  BackgroundProvider,
  themeContext,
} from "@/components/StyleUniform";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { useContext } from "react";

const goToCall: Function = (phoneNumber: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};

const CallNumber = (Message: String, hotLineNumber: number) => {
  alert("คุณกำลังโทรไปยัง " + hotLineNumber);
  goToCall(hotLineNumber);
};

const HotLine = (Message: String, HotLine: number) => {
  const theme = useContext(themeContext);
  return(
    <TouchableOpacity
      onPress={() => CallNumber(Message, HotLine)}
      style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
    >
      <Text
        style={[styleUniform.buttonText, { color: theme.buttonContentColor }]}
      >
        {Message + " (" + HotLine + ")"}
      </Text>
    </TouchableOpacity>
  );
}

const EmercallPage = () => {
  const theme = useContext(themeContext);

  return (
    <BackgroundProvider>
      <View style={{ marginHorizontal: 12, gap: 5 }}>
        <Text style={[styleUniform.subHeaderText, { color: theme.textcolor }]}>
          {"เลือกเบอร์ฉุกเฉินด้านล่างเพื่อโทร"}
        </Text>
        {HotLine("พยาบาล (ทั่วประเทศ)", 1669)}
        {HotLine("พยาบาล (เฉพาะในกรุงเทพฯ)", 1646)}
        {HotLine("ดับเพลิง / เผชิญสัตว์ร้าย", 199)}
        {HotLine("ตำรวจ", 191)}
        {HotLine("เกิดภัยพิบัติ", 192)}
        {HotLine("บุคคลสูญหาย", 1300)}
      </View>
    </BackgroundProvider>
  );
};

export default EmercallPage;
