import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface IButton {
    title: string;
    handlePress: () => void;
    disabled: boolean;
}
export default function Button({title, handlePress, disabled}: IButton){
    return(
        <Pressable style={styles.container} disabled={disabled} onPress={handlePress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 12,
        backgroundColor: '#008E5B',
        minHeight: 75,
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    }
  });
  