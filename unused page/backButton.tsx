import React, { memo } from "react";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const BackButton: React.FC = memo(() => {
  const router = useRouter();

  return (
    
    <View>
        <TouchableOpacity
          onPressOut={() => {
            /* onPress Doesn't work as intended, use onPressOut instead
               Description: onPressout is triggered prematurely, and
               onPress doesn't trigger unless clicking a lot of times
               (depending on how long you are on the page, it will take
               more pressings), still don't know why it behaves like that
               As a workaround, I use onPressOut instead and it's
               functionally almost the same thing, I decided to fail
               my perfectionistic self in order to just make it work and
               move on. Thank you for reading all the way here.
            */
            router.back();
          }}
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
          <Text style={{ color: "#fff" }}> Back </Text>
        </TouchableOpacity>
    </View>
  );
});

export default BackButton;
