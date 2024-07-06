import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.018,
  longitudeDelta: 0.0121,
};

const GoogleMap = () => {
  const Navigation = useNavigation();

  const [currentPosition, setCurrentPosition] = useState(initialState);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error) => Alert.alert(error.message)
    );
    fetch(
      // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      //   currentPosition ? currentPosition.latitude : ""
      // },${
      //   currentPosition ? currentPosition.longitude : ""
      // }&radius=1000&type=restaurant&key=AIzaSyD-BpBRBkBgayvMQ8Cn04qu-5-5jtgsupI`
    )
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPosition]);
  return currentPosition.latitude ? (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentPosition}
        showsUserLocation
        zoomEnabled
        onPress={() => Navigation.navigate("BottomTabNavigator2")}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
          />
        ))}

        <Marker coordinate={currentPosition} />
      </MapView>

      {/* //Add google autocomplete */}

      <View
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          padding: 2,
          width: "80%",
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          borderRadius: 10,
          top: 15,
          left: "10%",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="🔎 Search"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyAjusSunIayCE9QjGg-bOGxRsGVXGlV2i8",
            language: "en",
          }}
        />
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} animating size="large" />
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
