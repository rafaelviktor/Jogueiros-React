import React from "react";
import Ionic from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, type = 'primary' , onpress }) => {
    if(type === 'booking') {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
                <Ionic name='logo-usd' size={20} color='white' style={{paddingRight: 5}}/>
                <Text style={styles[`text_${type}`]}>{title}</Text>
            </TouchableOpacity>
        )
    } else if(type === 'payment') {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
                <Ionic name='logo-usd' size={20} color='white' style={{paddingRight: 5}}/>
                <Text style={styles[`text_${type}`]}>{title}</Text>
            </TouchableOpacity>
        )
    } else if(type === 'mini') {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
                <Text style={styles[`text_${type}`]}>{title}</Text>
            </TouchableOpacity>
        )
    } else if(type === 'time') {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
                <Text style={styles[`text_${type}`]}>{title}</Text>
            </TouchableOpacity>
        )
    } else if(type === 'muted') {
        return (
            <TouchableOpacity style={styles[`button_${type}`]} onPress={onpress}>
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
    button_muted: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#dddfe0',
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
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
    button_payment: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#1a9946',
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button_mini: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#1a9946',
        width: '35%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button_date: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#1a9946',
        width: '60%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button_time: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#1a9946',
        width: '35%',
        height: 55,
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
    text_muted: {
        color: '#414549',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_booking: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_payment: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_mini: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_date: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    text_time: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
})