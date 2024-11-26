import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";
import LogOutButton from "@/components/LogOutButton";

const TabsLayout = () => {
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
            headerLeft: () => <LogOutButton />,
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
            headerLeft: () => <LogOutButton />,
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
            headerLeft: () => <LogOutButton />,
          }}
        />
      </Tabs>
  );
};

export default TabsLayout;
