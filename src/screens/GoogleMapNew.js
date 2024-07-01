import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const GoogleMapNew = () => {
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={currentPosition}
        showsUserLocation
      ></MapView>
    </View>
  );
};

export default GoogleMapNew;
