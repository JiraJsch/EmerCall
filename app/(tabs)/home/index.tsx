import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "@/components/GredientBackground";
import Card from "@/components/Card"
import * as Location from 'expo-location'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import StyleUniform from "@/components/StyleUniform";

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
  return (
    <Card
      style={{
        backgroundColor: "#555555",
        width: 200,
      }}
    >
      <Text numberOfLines={2} style={{lineHeight: 15, height: 30}}> {departmentName} </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.numberText}>{hotLine}</Text>
        <TouchableOpacity
        //onPress={}
        >
          <Feather name="phone" size={24} color={"#222"} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const HomePage = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState(INITIAL_REGION);
  const [placesResults, setPlacesResults] = useState<any[]>([])
  const map = useRef<MapView| null>(null);
  
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

  useEffect(() => {
    getLocation();
  }, []);

  const searchPlaces = async (placesType: string) => {
    const googleMapAPI =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const searchLocation = `${userLocation.latitude},${userLocation.longitude}`;
    const searchURL = `${googleMapAPI}?location=${searchLocation}&radius=5000&type=${placesType}&language=th&key=AIzaSyBhrsrEV6CwXWG1yPq5iD1L2G-bJq4rEMQ`;

    /*
			Interesting Improvement Consideration:
			  https://stackoverflow.com/questions/9614258/how-to-get-20-result-from-google-places-api
		*/
    /*
      Search Parameter for Search Optimization
      (Experimental, Still in Trial-and-Error, Will do at 100% Report)

      Hospital: {
        Radius: 5000
      }
      Police:{
        Radius: 15000
      }
    */

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
        console.log(resultJSON);
        for (const resultItem of resultJSON.results) {
          coords.push({
            latitude: resultItem.geometry.location.lat,
            longitude: resultItem.geometry.location.lng,
          });
          console.log(
            resultItem.geometry.location.lat +
              ", " +
              resultItem.geometry.location.lng
          );
        }
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 30,
            },
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
      <View style={{ marginHorizontal: 24 }}>
        <View style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
          <Text
						numberOfLines={1}
						style={StyleUniform.PageHeadText}
					>
							สวัสดีครับ
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

export default HomePage;

const styles = StyleSheet.create({
  numberText: {
    fontSize: 24,
  },
  map: {
    width: "100%",
    height: "53%",
  },
});