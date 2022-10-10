import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../assets/api/axios';

function Anuncio({ route, navigation }) {
  const {id_anuncio} = route.params.id_anuncio;
  const ANUNCIO_URL = `/anuncios/${id_anuncio}`;

  const [anuncio, setAnuncioObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get(ANUNCIO_URL,{
        headers: {'Content-Type':'application/json','token':`${token}`},
        withCredentials: true
      });
      if(response.data.success === true) {
        setAnuncioObj(response.data.result)
        setIsAuthenticated(true)
      }
    } catch (err) {
      setIsAuthenticated(false);
      navigation.goBack();
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getToken();
  },[])

  if(isLoading === false) {
    return (
      <View style={styles.root}>
        <View style={styles.containerCards}>
          {
            anuncio && anuncio.map((item, index) => (
            <View key={index}>
              <Image style={styles.cardImage} source={{uri : `https://jogueiros-api.herokuapp.com/uploads/${item.imagem}`}}></Image>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardSubtitle}>{item.visualizacoes} Visualizações</Text>
                </View>
                <Text style={styles.cardPrice}>{item.preco} R$ /hora</Text>
              </View>
            </View>
            ))
          }
        </View>
    </View>
    );
} else {
    return (
    <View style={styles.center}>
      <ActivityIndicator color={"#1a9946"} size={60} />
    </View>)
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: 28,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8'
  },
  logoImage: {
    width: '101%',
    height: 65,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#EAEAEA',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  inputpesquisa: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EAEAEA',
    color: '#424242',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  containerCards: {
    marginLeft: 18,
    marginRight: 18
  },
  cardImage: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 250,
    borderRadius: 15
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardSubtitle: {
    marginLeft: 8,
    color: '#878787',
    fontSize: 13,
    fontWeight: 'bold'
  },
  cardPrice: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a9946'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Anuncio;