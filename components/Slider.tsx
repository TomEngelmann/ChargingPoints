import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {default as RNSlider} from "@react-native-community/slider";

interface ISlider {
    value: number;
    title: string;
    onChange: (value: number) => void;
}
export default function Slider({value, title, onChange}: ISlider){
    return(
        <View>
            <Text style={styles.text}>{title} {" "} {value}</Text>
            <RNSlider
                step={1}
                minimumValue={1}
                maximumValue={50}
                minimumTrackTintColor='#008E5B'
                maximumTrackTintColor="#d9d9d9"
                style={styles.slider}
                value={value}
                onValueChange={(value) => onChange(value)}
            />
    </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontWeight: '500',
        textAlign: 'left'
    },
    slider: {
        width: '100%',
        height: 50
    }
})