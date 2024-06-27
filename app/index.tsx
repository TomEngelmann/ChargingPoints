import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, router} from 'expo-router';

import Button from 'components/Button';
import SearchBar from 'components/SearchBar';
import CheckBox from 'components/CheckBox';
import Slider from 'components/Slider';
import GetPoints from 'api/charging';
import {GeoCoding} from 'api/geocoding';
import GetGasStations from 'api/gasStations'

export default function Home() {
  const [location, setLocation] = useState("");
  const [freeParking, setFreeParking] = useState(false)
  const [freeLoading, setFreeLoading] = useState(false)
  const [open247, setOpen247] = useState(false)
  const [accessibility, setAccessibility] = useState(false)
  const [radius, setRadius] = useState(50)

  const [loading, setLoading] = useState(false)

  const handleChargingPoints = async() => {
    setLoading(true)
    const place = await GeoCoding({ address: location })
    if(!place?.[0]?.lat || !place?.[0]?.lon) {
      alert("Ort ist ungültig.")
      setLocation("")
      setLoading(false)
      return null;
    }

    try{
      const result = await GetPoints({
        lat: place?.[0]?.lat,
        lng: place?.[0]?.lon,
        radius,
        accessibility,
        freeLoading,
        freeParking,
        open247
      });

      setLoading(false)
      router.push({
        pathname: "chargingDetails",
        params: {
          name: location,
          data: JSON.stringify(result)
        }
      })
    }
    catch(error) {
      console.log(error)
      setLoading(false)
      alert("unexpected error")
    }
  }

  const handleGasStations = async () => {
    setLoading(true);
    const place = await GeoCoding({ address: location });
    if (!place?.[0]?.lat || !place?.[0]?.lon) {
      alert("Ort ist ungültig.");
      setLocation("");
      setLoading(false);
      return null;
    }

    try {
      const result = await GetGasStations({
        lat: place?.[0]?.lat,
        lng: place?.[0]?.lon,
        radius,
        sorting: "dist",
        fuelType: "all"
      });

      setLoading(false);
      router.push({
        pathname: "fuelDetails",
        params: {
          name: location,
          data: JSON.stringify(result?.stations)
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("unexpected error");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Ladesäulen und Tankstellen finden",
        }}
      />

      <View style={styles.container}>

        <View style={styles.section}>
          <SearchBar placeholder='Standort finden' location={location} handleSearch={(value) => setLocation(value)} />
        </View>

        <View style={styles.section}>
            <Slider value={radius} onChange={(value) => setRadius(value)} title='Radius (km)' />
        </View>
        <View style={styles.section}> 
          <CheckBox title='Kostenloses Parken' value={freeParking} onChange={(value) => setFreeParking(value)}/>
        </View>

        <View style={styles.section}> 
          <CheckBox title='Kostenloses Laden' value={freeLoading} onChange={(value) => setFreeLoading(value)}/>
        </View>

        <View style={styles.section}> 
          <CheckBox title='24/7 offen' value={open247} onChange={(value) => setOpen247(value)}/>
        </View>

        <View style={styles.section}> 
          <CheckBox title='Barrierefreiheit' value={accessibility} onChange={(value) => setAccessibility(value)}/>
        </View>

        <View style={styles.buttonSection}>
          <View style={styles.button}>
            <Button handlePress={handleChargingPoints} title="Ladestationen suchen" disabled={location === '' || loading}/>
          </View>
          <View style={styles.button}>
            <Button handlePress={handleGasStations} title="Tankstellen suchen" disabled={location === '' || loading}/>
          </View>
        </View>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  buttonSection: {
    marginTop: 'auto',
    marginBottom: 50,
    paddingHorizontal: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
    paddingVertical: 10,
    paddingHorizontal: '10%',
    width: '100%'
  }, 
  button: {
    flex: 1,
    marginHorizontal: 10, 
  },
});
