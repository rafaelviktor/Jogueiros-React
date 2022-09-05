import * as React from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

function Populares() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginh1}>Populares</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      marginLeft: 30,
      marginRight: 30
    },
    loginh1: {
      marginTop: 40,
      fontWeight: 'bold',
      fontSize: 30
    },
    label: {
      marginTop: 10
    },
    input: {
      marginTop: 40,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10
    },
    inputpesquisa: {
      marginTop: 40,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10,
      textAlign: 'center'
    }
  });

export default Populares;