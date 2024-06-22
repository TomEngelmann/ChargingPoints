import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Checkbox from 'expo-checkbox';

interface ICheckBox{
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;

}
export default function CheckBox({title, value, onChange}: ICheckBox){
    return(
        <Pressable style={styles.container} onPress={() => onChange(!value)}>
            <Text style={styles.text}>
                {title}
            </Text>
            <Checkbox
                style={styles.checkbox}
                value={value}
                onValueChange={(value) => onChange(value)}
                color={value ? '#008E5B' : undefined}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkbox: {
        width: 16,
        height: 16,
        padding: 10
    },
    text: {
        fontWeight: '500',
    }
  });
  