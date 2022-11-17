import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../assets/components/button';
import moment from "moment";

function Reservar({ route, navigation }) {
  const dadosAnuncio = JSON.parse(route.params.dadosAnuncio);

  // configurações do datepicker
  const [dataReserva, setDataReserva] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState(zerarMinutos(new Date()));
  const [horaFinal, setHoraFinal] = useState(adicionarHoras(new Date(), 3));
  const [parcelas, setParcelas] = useState(new Date());

  function zerarMinutos(date) {
    date.setMinutes(0);
    return new Date(date);
  }

  function adicionarHoras(date, hours) {
    date.setHours(date.getHours() + hours);
    date.setMinutes(0);
    return new Date(date);
  }

  const [showData, setShowData] = useState(false);
  const [showInicio, setShowInicio] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const onChangeData = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowData(false);
    setDataReserva(currentDate);
  };

  const onChangeHInicio = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowInicio(false);
    setHoraInicio(currentDate);
  };

  const onChangeHFinal = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowFinal(false);
    setHoraFinal(currentDate);
  };

  const showDatepicker = () => {
    setShowData(true)
  };

  const showStartTime = () => {
    setShowInicio(true)
  };

  const showEndTime = () => {
    setShowFinal(true)
  };

  // configurações dos dados de cartão
  const [numero, setNumero] = useState('');
  const [cvv, setcvv] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [titular, setTitular] = useState('');

    return (
      <View style={styles.root}>
        <ScrollView overScrollMode='never'>
          <View>
              <View>
                <View style={styles.container}>
                  <View style={{marginTop: 20}}>
                    <Text style={styles.cardTitle}>Data da reserva</Text>
                    <Text style={styles.cardText}>Selecione para alterar</Text>
                    <Button type='date' onpress={showDatepicker} title={moment(dataReserva).format("DD/MM/YYYY")} />
                    {showData && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dataReserva}
                        mode='date'
                        is24Hour={true}
                        onChange={onChangeData}
                      />
                    )}
                  </View>
                  <View style={styles.hr} />
                  <View style={{marginTop: 20}}>
                    <Text style={styles.cardTitle}>Horários</Text>
                    <Text style={styles.cardText}>Selecione o horário de início e final</Text>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button type='time' onpress={showStartTime} title={moment(horaInicio).format("HH:mm")} />
                    {showInicio && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={horaInicio}
                        mode='time'
                        is24Hour={true}
                        onChange={onChangeHInicio}
                      />
                    )}
                    <Text style={styles.cardTitle}>às</Text>
                    <Button type='time' onpress={showEndTime} title={moment(horaFinal).format("HH:mm")} />
                    {showFinal && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={horaFinal}
                        mode='time'
                        is24Hour={true}
                        onChange={onChangeHFinal}
                      />
                    )}
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={{marginTop: 20}}>
                    <Text style={styles.cardTitle}>Pagamento</Text>
                    <Text style={styles.cardText}>Insira abaixo os dados do cartão</Text>
                    <TextInputMask
                    placeholder='Número do cartão'
                    style={styles.input}
                    type={'credit-card'}
                    options={{
                      obfuscated: false,
                      issuer: 'visa-or-mastercard'
                    }}
                    value={numero}
                    onChangeText={setNumero}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <TextInputMask
                        placeholder='Validade'
                        type={'datetime'}
                        options={{
                          format: 'MM/YY'
                        }}
                        value={vencimento}
                        onChangeText={setVencimento}
                        style={styles.inputValidade}
                      />
                      <TextInput
                      placeholder='CVV'
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={setcvv}
                      value={cvv}
                      style={styles.inputCVV}
                      />
                    </View>
                    <TextInput
                    placeholder='Titular do cartão'
                    onChangeText={setTitular}
                    value={titular}
                    style={styles.input}
                    />
                  </View>
                </View>
              </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardPrice}>{dadosAnuncio.preco} R$ /hora</Text>
            <Button type='mini' title='Continuar' onpress={() => navigation.navigate('Confirmar e pagar', { anuncio: route.params.dadosAnuncio, reserva: {data: dataReserva.toJSON(), inicio: horaInicio.toJSON(), final: horaFinal.toJSON() }, cartao: { numero: numero, validade: vencimento, cvv: cvv, titular: titular }})}/>
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
  input: {
    flex: 1,
    padding: 8,
    marginTop: 7,
    backgroundColor: '#EAEAEA',
    color: '#424242',
    borderRadius: 10
  },
  inputValidade: {
    flex: 1,
    padding: 8,
    marginTop: 7,
    marginRight: 3,
    backgroundColor: '#EAEAEA',
    color: '#424242',
    borderRadius: 10
  },
  inputCVV: {
    flex: 1,
    padding: 8,
    marginTop: 7,
    marginLeft: 3,
    backgroundColor: '#EAEAEA',
    color: '#424242',
    borderRadius: 10
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
    marginBottom: 15,
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