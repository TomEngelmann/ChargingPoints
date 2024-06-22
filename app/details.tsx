import { ChargeLocation } from 'api/charging';
import Location from 'components/icons/Location';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Linking, Platform } from 'react-native';

interface INavigateTo {
    coordinates: {
        lat: number;
        lng: number;
    },
    label: string;
}
const navigateTo = ({coordinates, label}: INavigateTo) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${coordinates.lat},${coordinates.lng}`;
    const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
    web: `http://maps.google.com/maps?q=${latLng}`
    });
    Linking.openURL(url);
}
const Item = ({address, name, coordinates}: ChargeLocation) => (
    <View style={styles.itemBorder}>
        <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{address.city}{" "} {address.street}</Text>
            </View>
            <Pressable onPress={() => navigateTo({coordinates, label: name}) }>
                <Location width={24} height={24} color="#000"/>
            </Pressable>
        </View>
     
    </View>
  );
export default function Details() {
    const params = useLocalSearchParams();
    const stations: ChargeLocation[] = JSON.parse(params?.data as string)
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                headerTitle: params.name as string,
                headerBackTitleVisible: false
                }}
            />
            <View style={styles.itemBorder}>
                <Text style={styles.title}>{stations.length} Ladestationen gefunden</Text>
            </View>
            <FlatList 
                data={stations}
                renderItem={({item}) => <Item {...item} />}
                keyExtractor={item => item.url}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  itemBorder: {
    width: '100%',
    paddingTop: 15,
    paddingHorizontal: '10%',
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    display: 'flex',
    gap: 5
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    fontWeight: '500'
  }
});
