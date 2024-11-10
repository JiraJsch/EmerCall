import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Dialog from "react-native-dialog";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "@/components/GredientBackground";
import Card from "@/components/Card";
import StyleUniform from "@/components/StyleUniform";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const goToCall: Function = (phoneNumber: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};

const INITIAL_REGION = {
  latitude: 13.080361,
  longitude: 101.45,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

const DepartmentLine = (departmentName: string, hotLine: string) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleConfirmCall = () => {
    goToCall(hotLine);
    setDialogVisible(false);
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
            setDialogVisible(true);
          }}
        >
          <Feather name="phone" size={24} color={"#222"} />
        </TouchableOpacity>

        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>ยืนยัน?</Dialog.Title>
          <Dialog.Description>
            คุณจะโทรไปยัง {departmentName} ({hotLine}) ใช่หรือไม่?
          </Dialog.Description>
          <Dialog.Button label="ไม่" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="ใช่" onPress={handleConfirmCall} />
        </Dialog.Container>
      </View>
    </Card>
  );
};

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState(INITIAL_REGION);
  const [placesResults, setPlacesResults] = useState<any[]>([]);
  const map = useRef<MapView | null>(null);

  useEffect(() => {
    if (isLoaded && !user) {
      // If the user isn't signed in, navigate them to the sign-in page
      router.replace("/(public)/login");
      return;
    }

    // If the user is signed in, fetch location data
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    };

    if (user) {
      getLocation(); // Fetch location if user is authenticated
    }
  }, [user, isLoaded]); // Depend on `user` and `isLoaded`

  const searchPlaces = async (placesType: string) => {
    const googleMapAPI =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const searchLocation = `${userLocation.latitude},${userLocation.longitude}`;
    const searchURL = `${googleMapAPI}?location=${searchLocation}&radius=5000&type=${placesType}&language=th&key=AIzaSyBhrsrEV6CwXWG1yPq5iD1L2G-bJq4rEMQ`;

    try {
      const response = await fetch(searchURL);
      const resultJSON = await response.json();
      if (resultJSON && resultJSON.results) {
        setPlacesResults(resultJSON.results);
        if (resultJSON.status !== "OK") {
          setErrorMsg("Error fetching result " + resultJSON.status);
          console.error("Error fetching result: " + resultJSON.status);
        }
        const coords: LatLng[] = [];
        for (const resultItem of resultJSON.results) {
          coords.push({
            latitude: resultItem.geometry.location.lat,
            longitude: resultItem.geometry.location.lng,
          });
        }
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
            animated: true,
          });
        }
      }
    } catch (e) {
      setErrorMsg("Error fetching result");
      console.error(e);
    }
  };

  // If the user data is still loading, show a loading state
  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>Redirecting to Sign-In...</Text>;
  }

  // Main content of the page when the user is signed in
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
          <Text numberOfLines={1} style={StyleUniform.PageHeadText}>
            {"สวัสดีครับ คุณ " + user.firstName}
          </Text>
          <Image
            source={require("@/assets/images/logo-wording.png")}
            style={StyleUniform.subLogoImage}
            resizeMode="contain"
          />
        </View>

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

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => searchPlaces("hospital")}>
            <Card style={{ width: windowWidth / 2 - 40 }}>
              <Text style={{ textAlign: "center" }}>โรงพยาบาลใกล้ฉัน</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => searchPlaces("police")}>
            <Card style={{ width: windowWidth / 2 - 40 }}>
              <Text style={{ textAlign: "center" }}>สถานีตำรวจใกล้ฉัน</Text>
            </Card>
          </TouchableOpacity>
        </View>

        <MapView
          ref={map}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={userLocation}
          region={userLocation}
          showsUserLocation={true}
        >
          {placesResults.length
            ? placesResults.map((resultItem, i) => {
                const coord: LatLng = {
                  latitude: resultItem.geometry.location.lat,
                  longitude: resultItem.geometry.location.lng,
                };
                return (
                  <Marker
                    key={`search=item=${i}`}
                    coordinate={coord}
                    title={resultItem.name}
                  />
                );
              })
            : null}
        </MapView>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  numberText: {
    fontSize: 24,
  },
  map: {
    width: "100%",
    height: windowHeight / 2,
  },
});

export default HomePage;
