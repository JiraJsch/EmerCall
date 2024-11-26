import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "@/components/GredientBackground";
import Card from "@/components/Card";
import { router } from "expo-router";
import styleUniform from "@/components/StyleUniform";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const goToCall: Function = (phoneNumber: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};

const DepartmentLine = (departmentName: string, hotLine: string) => {
  const handleConfirmCall = (hotLine: String) => {
    Alert.alert("Are you sure?", "You're calling " + hotLine, [
      {
        text: "Yes",
        onPress: () => goToCall(hotLine)
      },
      {
        text: "No",
        onPress: () => {return null}
      }
    ]);
  };

  return (
    <Card style={{ backgroundColor: "#555555", width: 200 }}>
      <Text numberOfLines={2} style={{ lineHeight: 15, height: 30 }}>
        {departmentName}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.numberText}>{hotLine}</Text>
        <TouchableOpacity
          onPress={() => {
            return(
              handleConfirmCall(hotLine)
            )
          }}
        >
          <Feather name="phone" size={24} color={"#222"} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const HomePage = () => {
  const errorAlert = (errorMsg: string) => {
    Alert.alert("Error", errorMsg, [
      {
        text: "OK",
        onPress: () => {return null},
      },
    ]);
  };

  const handleToMapSearchPage = async () => {
    const { status: Permissionstatus } = await Location.requestForegroundPermissionsAsync();
    if (Permissionstatus !== "granted") {
      return errorAlert("Permission to access location was denied");
    }
    const locationStatus = await Location.getProviderStatusAsync();
    if (!locationStatus.locationServicesEnabled) {
      return errorAlert("Location services are disabled. Please enable GPS.");
    }
    router.navigate("/map-search")
  }

  return (
    <GradientBackground>
      <View style={{ flex: 1, marginHorizontal: 24 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={1} style={styleUniform.PageHeadText}>
            {"สวัสดีครับ"}
          </Text>
          <Image
            source={require("@/assets/images/logo-wording.png")}
            style={styleUniform.subLogoImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={handleToMapSearchPage}>
          <Card style={{ width: windowWidth - 64 }}>
            <Text style={{ textAlign: "center" }}>
              🚨📍ค้นหาสถานที่ฉุกเฉินใกล้เคียง📍🚨
            </Text>
          </Card>
        </TouchableOpacity>
        <Card>
          <Text>เบอร์โทรของหน่วยงานภาครัฐ</Text>
          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            {DepartmentLine("การประปานครหลวง", "1125")}
            {DepartmentLine("การประปาส่วนภูมิภาค", "1662")}
            {DepartmentLine("การไฟฟ้านครหลวง", "1130")}
            {DepartmentLine("การไฟฟ้าส่วนภูมิภาค", "1129")}
            {DepartmentLine("ศูนย์รับเรื่องร้องทุกข์ ทำเนียบรัฐบาล", "1111")}
            {DepartmentLine("ศูนย์ประชาบดี แจ้งคนหาย", "1300")}
          </ScrollView>
        </Card>
      </View>
    </GradientBackground>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  numberText: {
    fontSize: 24,
  },
  map: {
    width: "100%",
    height: windowHeight / 2,
  },
});
