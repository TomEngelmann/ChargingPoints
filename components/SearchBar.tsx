import React from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Location from "./icons/Location";
import { getCurrentLocation } from "api/currentLocation";

interface ISearchBar{
    location: string;
    placeholder: string;
    handleSearch: (value: string) => void;

}
export default function SearchBar({location, placeholder, handleSearch}: ISearchBar){
    const handleLocation = async() => {
        try{
            const result = await getCurrentLocation()
            handleSearch(result)
        }
        catch(error) {
            console.log(error)
            return
        }
    }
    return(
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} value={location} onChangeText={(value: string) => handleSearch(value)} />
            <Pressable onPress={handleLocation}><Location height={32} width={32} color="#000" /></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    input: {
        flexGrow: 1,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        padding: 10
    }
  });