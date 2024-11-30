import { ActivityIndicator, Alert, Dimensions, Linking, Text, TouchableOpacity, View } from "react-native";
import styleUniform from "@/components/StyleUniform";
import GradientBackground from "@/components/GredientBackground";
import Card from "@/components/Card";
import MapView, { PROVIDER_GOOGLE, LatLng, Marker } from "react-native-maps";
import { useState, useRef, useEffect } from "react";
import * as Location from "expo-location";
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

const mapViewPage = () => {
  const [detailedLocation, setDetailedLocation] = useState<Location.LocationObject | null>(null);
  const [userLocation, setUserLocation] = useState(INITIAL_REGION);
  const [placesResults, setPlacesResults] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
      setErrorMsg("Permission to access location was denied");
      errorAlert(errorMsg!);
      return router.back();
    }

    const locationStatus = await Location.getProviderStatusAsync();
    if (!locationStatus.locationServicesEnabled) {
      setErrorMsg("Location services are disabled. Please enable GPS.");
      errorAlert(errorMsg!);
      return router.back();
    }

    let currentLocation = await Location.getCurrentPositionAsync();
    setDetailedLocation(currentLocation);
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
    }, 5000);
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

  return (
    <GradientBackground>
      <View style={{ flex: 1 }}>
        {userLocation === INITIAL_REGION && (
          <View
            style={{
              flex: 1,
              backgroundColor: "#555",
              opacity: 0.5,
              justifyContent: "center",
            }}
          >
            <Text style={[styleUniform.contentText, { alignSelf: "center" }]}>
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
          <Text style={[styleUniform.contentText, {alignSelf: "center"}]}>
            ค้นหาสถานที่ โดยกดปุ่มด้านล่าง
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => searchPlaces("hospital")}>
              <Card
                style={[styleUniform.button, { width: windowWidth / 2 - 16 }]}
              >
                <Text style={styleUniform.buttonText}>โรงพยาบาล</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => searchPlaces("police")}>
              <Card
                style={[styleUniform.button, { width: windowWidth / 2 - 16 }]}
              >
                <Text style={styleUniform.buttonText}>สถานีตำรวจ</Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

export default mapViewPage;
