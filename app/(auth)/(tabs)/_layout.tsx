import { Text, View } from "react-native";
import { TabBar } from "@/components/TabBar";
import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

const LogOutButton: React.FC = () => {
  const { signOut } = useAuth();  // The hook should be called unconditionally
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      router.replace("/login");
      await SecureStore.deleteItemAsync("your-token-key");
      await signOut();
    } catch (error) {
      console.error("Log out failed", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogOut}
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Feather name="log-out" size={24} color="#fff" />
      <Text style={{ color: "#fff" }}> Log Out </Text>
    </TouchableOpacity>
  );
};

const TabsLayout = () => {


  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
    >
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
          headerLeft: () => <LogOutButton/>,
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
          headerLeft: () => <LogOutButton/>,
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
          headerLeft: () => <LogOutButton/>,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
