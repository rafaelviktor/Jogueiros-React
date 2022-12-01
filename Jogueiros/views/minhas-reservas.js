import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, ActivityIndicator, TouchableNativeFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../assets/api/axios';

function MinhasReservas({ navigation }) {
  const MINHASRESERVAS_URL = '/perfil/minhas-reservas';
  const EXCLUIR_URL = '/reservas/excluir/';

  const [reservas, setReservasObj] = useState([]);
  const [exclusao, setExclusao] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get(MINHASRESERVAS_URL,{
        headers: {'Content-Type':'application/json','token':`${token}`},
        withCredentials: true
      });
      if(response.data.success === true) {
        setReservasObj(response.data.result)
        console.log(reservas)
      }
    } catch (err) {
      navigation.goBack();
      await AsyncStorage.setItem('token', '');
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getToken();
  },[exclusao])

  const excluirReserva = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.delete(EXCLUIR_URL+id,{
        headers: {'Content-Type':'application/json','token':`${token}`},
        withCredentials: true
      });
      if(response.data.success === true) {
        Alert.alert("Sucesso",response.data.message)
        setExclusao(!exclusao)
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  function showAlert(id) {
    Alert.alert(
      "Excluir reserva",
      `Tem certeza que deseja excluir? este processo é irreversível e será necessário reagendar em caso de arrependimento. Reserva ID: ${id}`,
      [
        {
          text: "SIM",
          onPress: () => excluirReserva(id),
          style: "default"
        },
        {
          text: "NÃO",
          style: "default"
        },
      ],
      {
        cancelable: true
      }
    );
  }

  if(isLoading === false) {
    if(reservas.length === 0) {
      return (
      <View style={styles.center}>
        <Text style={styles.cardTitle}>Você não possui nenhuma reserva.</Text>
      </View>
      )
    } else {
      return (
        <View style={styles.root}>
        <ScrollView overScrollMode='never' style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.containerCards}>
            {
              reservas && reservas.map((item, index) => (
              <Pressable key={index}>
                <View style={[styles.cardBody, styles.shadowProp, styles.elevation]}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.heading}>Dados da sua reserva</Text>
                    <Text style={styles.status}>{item.status}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <Text style={styles.textNormal}>Data: {item.data_reserva} | Início: {item.hora_inicio} - Final: {item.hora_final}</Text>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <Text style={styles.textMuted}>Data de criação: {item.data_inclusao}</Text>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f75c5c', true, 26)} onPress={() => showAlert(item._id)}>
                          <View>
                            <Text style={styles.textDelete}>EXCLUIR</Text>
                          </View>
                        </TouchableNativeFeedback>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
              ))
            }
          </View>
        </ScrollView>
      </View>
      )
    }
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
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
  },
  cardBody: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  textNormal: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  textMuted: {
    color: '#878787',
    fontSize: 13,
    fontWeight: 'bold'
  },
  textDelete: {
    color: '#eb3434',
    fontSize: 13,
    fontWeight: 'bold'
  },
  status: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#878787'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MinhasReservas;