import React, { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View, ScrollView, Text, TextInput, Image, Pressable, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import logo from '../assets/jogueiros-logo.png';
import api from '../assets/api/axios';

function Home({ navigation }) {
  const isFocused = useIsFocused();
  const ANUNCIOS_URL = '/anuncios';
  const PESQUISA_URL = '/anuncios/pesquisa';

  const [anuncios, setAnunciosObj] = useState({});
  const [pesquisa, setPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    try {
      const response = await api.get(ANUNCIOS_URL,{
        headers: {'Content-Type':'application/json'}
      });
      if(response.data.success === true) {
        setAnunciosObj(response.data.result)
      }
    } catch (err) {
      setAnunciosObj([])
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getToken();
  },[isFocused])

  const getPesquisa = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(PESQUISA_URL,{
        headers: {'Content-Type':'application/json'}, params: { q: pesquisa}
      });
      if(response.data.success === true) {
        setAnunciosObj(response.data.result)
      }
    } catch (err) {
      setAnunciosObj([])
      console.log(err)
    }
    setIsLoading(false)
  }

  if(isLoading === false) {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Image style={styles.logoImage} source={logo}></Image>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput placeholder='Algum local de preferência?' style={styles.inputpesquisa} onChangeText={text => setPesquisa(text)} value={pesquisa} onSubmitEditing={getPesquisa} />
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC', true, 26)} onPress={getPesquisa}>
              <View>
                <Ionic name='search' size={25} color='#858585' style={styles.searchIcon}/>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <ScrollView overScrollMode='never'>
          <View style={styles.containerCards}>
          {
            anuncios && anuncios.map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('Anúncio', { id_anuncio: item._id, id_anunciante: item.id_anunciante })}>
              <Image style={styles.cardImage} source={{uri : `https://i.imgur.com/${item.imagem}`}}></Image>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardSubtitle}>{item.visualizacoes} Visualizações</Text>
                </View>
                <Text style={styles.cardPrice}>{item.preco} R$ /hora</Text>
              </View>
            </Pressable>
            ))
          }
          </View>
        </ScrollView>
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
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
      padding: 10
    },
    inputpesquisa: {
      flex: 1,
      padding: 8,
      borderBottomWidth: 2,
      borderBottomColor: '#1a9946'
    },
    containerCards: {
      marginLeft: 18,
      marginRight: 18,
      marginBottom: 18
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
    }
  });

export default Home;