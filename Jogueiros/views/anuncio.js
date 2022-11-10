import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../assets/components/button';
import api from '../assets/api/axios';

function Anuncio({ route, navigation }) {
  const PERFIL_URL = '/perfil';
  const ANUNCIO_URL = `/anuncios/${route.params.id_anuncio}`;
  const ANUNCIANTE_URL = `/users/${route.params.id_anunciante}`;

  const [anuncio, setAnuncioObj] = useState([]);
  const [anunciante, setAnuncianteObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getAnuncio = async () => {
    try {
      const response = await api.get(ANUNCIO_URL,{
        headers: {'Content-Type':'application/json'}
      });
      if(response.data.success === true) {
        setAnuncioObj(response.data.result)
      }
    } catch (err) {
      navigation.goBack();
      console.log(err)
    }
    try {
      const response = await api.get(ANUNCIANTE_URL,{
        headers: {'Content-Type':'application/json'}
      });
      if(response.data.success === true) {
        setAnuncianteObj(response.data.result)
      }
    } catch (err) {
      navigation.goBack();
      console.log(err)
    }
    setIsLoading(false)
  }

  const Reservar = async () => {
    // checar primeiro se está autenticado e se o token é válido, se sim entra na tela de reserva, senão, rejeita.
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get(PERFIL_URL,{
        headers: {'Content-Type':'application/json','token':`${token}`},
        withCredentials: true
      });
      if(response.data.success === true) {
        navigation.navigate('Agendar reserva', { dadosAnuncio: JSON.stringify(anuncio) })
      }
    } catch (err) {
      navigation.goBack();
      alert('É necessário fazer login para reservar.')
      console.log(err)
    }
  }

  useEffect(() => {
    getAnuncio();
  },[])

  if(isLoading === false) {
    return (
      <View style={styles.root}>
        <ScrollView overScrollMode='never'>
          <View>
            {
              <View>
                <Image style={styles.cardImage} source={{uri : `https://i.imgur.com/${anuncio.imagem}`}}></Image>
                <View style={styles.container}>
                  <View>
                    <Text style={styles.cardTitle}>{anuncio.titulo}</Text>
                    <Text style={styles.cardMuted}>{anuncio.logradouro}{anuncio.numero ? ", "+anuncio.numero : ""} - {anuncio.cidade}/{anuncio.estado}</Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={{marginTop: 20}}>
                    <Text style={styles.cardTitle}>Descrição</Text>
                    <Text style={styles.cardText}>{anuncio.descricao}</Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={{marginTop: 20, marginBottom: 20}}>
                    <Text style={styles.cardTitle}>Anunciante</Text>
                    <Text style={styles.cardText}>{anunciante.nome}</Text>
                    <Text style={styles.cardSubtitle}>Contatos:</Text>
                    <Text style={styles.cardText}>{anunciante.email}</Text>
                    <Text style={styles.cardText}>({String(anunciante.contato).substring(0,2)}) {String(anunciante.contato).substring(2,7)}-{String(anunciante.contato).substring(7,11)}</Text>
                  </View>
                </View>
              </View>
            }
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardPrice}>{anuncio.preco} R$ /hora</Text>
            <Button type='booking' title='Reservar' onpress={Reservar}/>
          </View>
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
    marginLeft: 15,
    marginRight: 15
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
  cardImage: {
    marginBottom: 30,
    width: '100%',
    height: 250
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: '500'
  },
  cardMuted: {
    marginTop: 5,
    color: '#878787',
    fontSize: 17,
    fontWeight: 'bold'
  },
  cardText: {
    marginTop: 5,
    fontSize: 17
  },
  cardPrice: {
    lineHeight: 45,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a9946'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hr: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    paddingBottom: 25
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    padding: 13
  }
});

export default Anuncio;