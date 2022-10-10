import React from "react";
import Ionic from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, type = 'primary' , onpress }) => {
    if(type === 'booking') {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
                <Ionic name='search' size={20} color='white' style={{paddingRight: 5}}/>
                <Text style={styles[`text_${type}`]}>{title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
                <Text style={styles[`text_${type}`]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

export default Button;

const styles = StyleSheet.create({
    button_primary: {
        backgroundColor: '#1a9946',
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button_danger: {
        backgroundColor: '#DC3545',
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button_tertiary: {
        width: '70%',
        margin: 20,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_booking: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#1a9946',
        width: '35%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text_primary: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_danger: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_tertiary: {
        color: '#1a9946',
        fontSize: 13,
        fontWeight: 'bold'
    },
    text_booking: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
})