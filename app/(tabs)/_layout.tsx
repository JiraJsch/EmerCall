import { themeContext } from "@/components/StyleUniform";
import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";
import { useContext } from "react";

const TabsLayout = () => {
  const theme = useContext(themeContext);

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "หน้าหลัก",
          title: "หน้าหลัก",
          headerTitleAlign: "center",
          headerTintColor: theme.tabBarContentColor,
          headerStyle: {
            backgroundColor: theme.tabBarColor,
          },
        }}
      />
      <Tabs.Screen
        name="emercall"
        options={{
          headerTitle: "โทรฉุกเฉิน",
          title: "โทรฉุกเฉิน",
          headerTitleAlign: "center",
          headerTintColor: theme.tabBarContentColor,
          headerStyle: {
            backgroundColor: theme.tabBarColor,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "ตั้งค่า",
          headerTitleStyle: { textAlign: "center" },
          title: "ตั้งค่า",
          headerTitleAlign: "center",
          headerTintColor: theme.tabBarContentColor,
          headerStyle: {
            backgroundColor: theme.tabBarColor,
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
