import { Text } from "react-native";
import { TabBar } from "@/components/TabBar";
import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const LogOutButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    <Feather name="log-out" size={24} color="#fff" />
    <Text style={{color: "#fff"}}> Log Out </Text>
  </TouchableOpacity>
);

const TabsLayout = () => {
  const router = useRouter();

  const handleLogOut = () => {
    router.dismissAll();
  };

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home Page",
          title: "Home",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerLeft: () => <LogOutButton onPress={handleLogOut} />,
        }}
      />
      <Tabs.Screen
        name="emercall"
        options={{
          headerTitle: "Emergency Call Page",
          title: "Emergency Call",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerLeft: () => <LogOutButton onPress={handleLogOut} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings Page",
          headerTitleStyle: { textAlign: "center" },
          title: "Settings",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerLeft: () => <LogOutButton onPress={handleLogOut} />,
        }}
      />
      <Tabs.Screen redirect name="index" />
    </Tabs>
  );
};

export default TabsLayout;
