import * as Location from "expo-location";
import { GetStreetFromCoords } from "./geocoding";

export const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission denied")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const result = await GetStreetFromCoords({
        lat: location.coords.latitude,
        long: location.coords.longitude
      })
      return result
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };