import React, { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import MapView from "react-native-maps";

export default function App() {
  const mapRef = useRef();
  const [message, setMessage] = useState("");

  const getAddress = (region) => {
    setMessage("REGION CHANGED");
    mapRef.current
      .addressForCoordinate({
        latitude: region.latitude,
        longitude: region.longitude,
      })
      .then((address) => {
        console.log("addy - ", address);
        setMessage("ADDRESS FOUND");
        // never gets hit
      })
      .catch((error) => {
        console.log("error - ", error);
        setMessage("ERROR CAUGHT");
        // always returns [Error: Can not get address location]
        // due to geocoder list always coming back with 0 results...
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        onRegionChangeComplete={getAddress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={{ position: "absolute", bottom: 20, left: 20,  }}>
        <View style={{backgroundColor: '#fff', padding: 10}}>
          <Text>{message}</Text>
        </View>
      </View>
    </View>
  );
}
