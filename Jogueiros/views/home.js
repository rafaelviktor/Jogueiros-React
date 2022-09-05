import * as React from 'react';
import { StyleSheet, Button, View, Text, TextInput, Image } from 'react-native';

import logo from '../assets/jogueiros-logo.png'

function Home() {
    return (
      <View style={styles.container}>
        <Image style={styles.logoImage} source={logo}></Image>
        <TextInput placeholder='Algum local de preferência?' style={styles.inputpesquisa} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      marginLeft: 30,
      marginRight: 30
    },
    inputpesquisa: {
      marginTop: 40,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10,
      textAlign: 'center'
    },
    logoImage: {
      marginTop: 30,
      width: 100,
      height: 80
    }
  });

export default Home;