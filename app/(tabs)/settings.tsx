import Card from "@/components/BasicComponentWithTheme";
import styleUniform, { BackgroundProvider, themeContext } from "@/components/StyleUniform";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { EventRegister } from 'react-native-event-listeners';

const settingsPage = () => {
  const theme = useContext(themeContext);
  return (
    <BackgroundProvider>
      <View style={{ marginHorizontal: 12, gap: 5 }}>
        <Text style={[styleUniform.subHeaderText, { color: theme.textcolor }]}>
          Theme
        </Text>
        <TouchableOpacity
          onPress={() => {
            EventRegister.emit("ChangeTheme", "default");
          }}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
          <Text
            style={[
              styleUniform.buttonText,
              { color: theme.buttonContentColor },
            ]}
          >
            ดั้งเดิม
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            EventRegister.emit("ChangeTheme", "dark");
          }}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
            <Text
              style={[
                styleUniform.buttonText,
                { color: theme.buttonContentColor },
              ]}
            >
              มืด
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            EventRegister.emit("ChangeTheme", "light");
          }}
          style={[styleUniform.button, { backgroundColor: theme.buttonColor }]}
        >
            <Text
              style={[
                styleUniform.buttonText,
                { color: theme.buttonContentColor },
              ]}
            >
              สว่าง
            </Text>
        </TouchableOpacity>
      </View>
    </BackgroundProvider>
  );
};

export default settingsPage;
