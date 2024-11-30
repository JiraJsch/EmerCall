import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "หน้าหลัก",
          title: "หน้าหลัก",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000",
          },
        }}
      />
      <Tabs.Screen
        name="emercall"
        options={{
          headerTitle: "โทรฉุกเฉิน",
          title: "โทรฉุกเฉิน",
          headerTitleAlign: "center",
          headerTintColor: "#f00",
          headerStyle: {
            backgroundColor: "#000",
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
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000",
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
