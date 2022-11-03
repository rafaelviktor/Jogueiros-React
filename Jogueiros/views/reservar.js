import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-modern-datepicker';
import Button from '../assets/components/button';
import api from '../assets/api/axios';

function Reservar({ route, navigation }) {
  const RESERVAR_URL = '/reservas/criar';
  const idAnuncio = route.params.id_anuncio;

  // configurações do datepicker
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState('');

  const [dataReserva, setDataReserva] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFinal, setHoraFinal] = useState('');

  const AgendarReserva = async () => {
    const data = {
        id_anuncio: idAnuncio,
        data_reserva: dataReserva,
        hora_inicio: horaInicio,
        hora_final: horaFinal
      }
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post(RESERVAR_URL,JSON.stringify(data),
          {
            headers: {'Content-Type':'application/json','token':`${token}`},
            withCredentials: true
          });
          if(response.data.success === true) {
            alert(response.data.message)
          } else if(response?.data.success === false) {
            navigation.goBack();
          } else {
            navigation.goBack();
          }
      } catch (err) {
          navigation.goBack();
      }
  }

    return (
      <View style={styles.root}>
        <ScrollView overScrollMode='never'>
          <View>
            {
              <View>
                <View style={styles.container}>
                  <View style={{marginTop: 20}}>
                    <Text style={styles.cardTitle}>Data da reserva</Text>
                    <DatePicker
                        onSelectedChange={date => setSelectedDate(date)}
                        mode="calendar"
                    />
                  </View>
                  <View style={styles.hr} />
                  <View style={{marginTop: 20}}>
                    <Text style={styles.cardTitle}>Horários</Text>
                    <Text>Início</Text>
                    <DatePicker
                        onTimeChange={selectedTime => setTime(selectedTime)}
                        mode="time"
                    />
                    <Text>Final</Text>
                    <DatePicker
                        onTimeChange={selectedTime => setTime(selectedTime)}
                        mode="time"
                    />
                  </View>
                </View>
              </View>
            }
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardPrice}>{route.params.preco} R$ /hora</Text>
            <Button type='mini' title='Continuar' onpress={() => console.log('reservar')} style={{ width: '40%' }}/>
          </View>
        </View>
      </View>
    );
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

export default Reservar;