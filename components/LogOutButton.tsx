import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const LogOutButton: React.FC = () => {
  const router = useRouter();

  const handleLogOut = () => {
    router.replace("/");
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

export default LogOutButton;