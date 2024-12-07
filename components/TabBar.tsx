import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "./StyleUniform";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useContext(themeContext);

  const getIcon = (RouteName: String) => {
    if (RouteName === "home") {
      return <Feather name="home" size={24} color={theme.tabBarContentColor} />;
    } else if (RouteName === "emercall") {
      return <Feather name="alert-circle" size={24} color={"#f00"} />;
    } else if (RouteName === "settings") {
      return (
        <Feather name="settings" size={24} color={theme.tabBarContentColor} />
      );
    } else {
      return <Feather name="x" size={24} color={theme.tabBarContentColor} />;
    }
  };

  return (
    <View style={[styles.tabbar, { backgroundColor: theme.tabBarColor }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {getIcon(route.name) as unknown as String}
            <Text
              style={{
                color:
                  label === "โทรฉุกเฉิน"
                    ? "#ff0000"
                    : isFocused
                    ? "#673ab7"
                    : theme.tabBarContentColor,
              }}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  tabbar: {
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
