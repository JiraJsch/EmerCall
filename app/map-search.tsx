import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styleUniform, {
  BackgroundProvider,
  themeContext,
} from "@/components/StyleUniform";
import Card from "@/components/BasicComponentWithTheme";
import MapView, { PROVIDER_GOOGLE, LatLng, Marker } from "react-native-maps";
import { useState, useRef, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const INITIAL_REGION = {
  latitude: 13.080361,
  longitude: 101.45,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

const mapViewPage = () => {
  const theme = useContext(themeContext);

  const [userLocation, setUserLocation] = useState(INITIAL_REGION);
  const [placesResults, setPlacesResults] = useState<any[]>([]);
  const map = useRef<MapView | null>(null);

  const errorAlert = (errorMsg: string) => {
    Alert.alert("Error", errorMsg, [
      {
        text: "OK",
        onPress: () => {
          return null;
        },
      },
    ]);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      errorAlert(
        "แอปไม่ได้รับอนุญาตให้เข้าถึง GPS กรุณาตั้งค่าเพื่อใช้ฟีเจอร์นี้"
      );
      return router.back();
    }

    const locationStatus = await Location.getProviderStatusAsync();
    if (!locationStatus.locationServicesEnabled) {
      errorAlert("GPS ปิดอยู่ กรุณาเปิดเพื่อใช้ฟีเจอร์นี้");
      return router.back();
    }

    let currentLocation = await Location.getCurrentPositionAsync();
    setUserLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getLocation();
    }, 1000);
    return () => clearTimeout(timer);
  }, [getLocation]);

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
          errorAlert("Error fetching result " + resultJSON.status);
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
      errorAlert("Error fetching result");
      console.error(e);
    }
  };

  return (
    <BackgroundProvider>
      <View style={{ flex: 1 }}>
        {userLocation === INITIAL_REGION && (
          <View
            style={{
              flex: 1,
              backgroundColor: theme.cardColorPrimary,
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styleUniform.contentText,
                { alignSelf: "center", color: theme.cardContentColorPrimary },
              ]}
            >
              {"กำลังดึงข้อมูลตำแหน่ง"}
            </Text>
            <ActivityIndicator
              size="large"
              color="#fff"
              onLayout={getLocation}
            />
          </View>
        )}
        {userLocation !== INITIAL_REGION && (
          <MapView
            ref={map}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={userLocation}
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
                      key={`search-item-${i}`}
                      coordinate={coord}
                      title={resultItem.name}
                    />
                  );
                })
              : null}
          </MapView>
        )}
        <View style={styleUniform.container}>
          <Text
            style={[
              styleUniform.contentText,
              { alignSelf: "center", color: theme.textcolor },
            ]}
          >
            ค้นหาสถานที่ โดยกดปุ่มด้านล่าง
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => searchPlaces("hospital")}>
              <Card
                style={[
                  styleUniform.button,
                  { backgroundColor: theme.buttonColor },
                ]}
              >
                <Text
                  style={[
                    styleUniform.buttonText,
                    { color: theme.buttonContentColor },
                  ]}
                >
                  โรงพยาบาล
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => searchPlaces("police")}>
              <Card
                style={[
                  styleUniform.button,
                  {
                    backgroundColor: theme.buttonColor,
                    width: windowWidth / 2 - 16,
                  },
                ]}
              >
                <Text
                  style={[
                    styleUniform.buttonText,
                    { color: theme.buttonContentColor },
                  ]}
                >
                  สถานีตำรวจ
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundProvider>
  );
};

export default mapViewPage;
