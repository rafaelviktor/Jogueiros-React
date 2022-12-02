import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../assets/components/button';
import api from '../assets/api/axios';
import moment from "moment";

function ConfirmarReserva({ route, navigation }) {
  // dados ficticios cartoes
  const BancoCartoes = [
    {
        "id": 1,
        "numero": "4234 4567 8765 2222",
        "cvv": "127",
        "vencimento": "12/24",
        "titular": "Caio Barroso",
        "bandeira": "Visa"
    },
    {
        "id": 2,
        "numero":  "6224 4337 8365 1111",
        "cvv": "601",
        "vencimento": "12/28",
        "titular": "Marcelo",
        "bandeira": "Hiper"
    },
    {
        "id": 3,
        "numero": "5225 2340 6776 1298",
        "cvv": "280",
        "vencimento": "05/29",
        "titular": "Rafael Viktor",
        "bandeira": "Mastercard"
    },
    {
        "id": 4,
        "numero": "3515 2345 6666 1278",
        "cvv": "908",
        "vencimento": "10/30",
        "titular": "Lucas",
       "bandeira": "Elo"
    },
    {
      "id": 5,
      "numero": "4756 1178 1949 6234",
      "cvv": "112",
      "vencimento": "24/30",
      "titular": "Eduardo",
      "bandeira": "Visa"
  }
]

  const [isLoading, setIsLoading] = useState(false);
  const RESERVAR_URL = '/reservas/criar';
  const dadosAnuncio = JSON.parse(route.params.anuncio);
  const dadosReserva = route.params.reserva;
  const dadosCartao = route.params.cartao;

  // tratamento das datas da reserva
  let dataReserva = moment(new Date(Date.parse(dadosReserva.data))).format("DD/MM/YYYY")
  let horaInicio = moment(new Date(Date.parse(dadosReserva.inicio))).format("HH:mm")
  let horaFinal = moment(new Date(Date.parse(dadosReserva.final))).format("HH:mm")

  // função de calcular Horas
  function calcularHoras(hInicio, hFinal) {
    let horas = parseInt(hFinal.substring(0,2)) - parseInt(hInicio.substring(0,2));
    if(horas === 0) {
      return 24;
    } else if(horas < 0) {
      return 24 - Math.abs(horas);
    } else {
      return horas;
    }
  }

  // cálculo custos da reserva
  let QtdHoras = calcularHoras(horaInicio, horaFinal);
  let TaxaServico = 14;
  let ValorHoras = dadosAnuncio.preco * QtdHoras;
  let ValorTotal = ValorHoras + TaxaServico;
  //adicionando valor total a reserva
  Object.assign(dadosReserva, {valor: ValorTotal})

  const AgendarReserva = async () => {
    for(let i = 0; i < BancoCartoes.length; i++) {
      if(BancoCartoes[i].numero == dadosCartao.numero) {
        if(BancoCartoes[i].cvv == dadosCartao.cvv) {
          if(BancoCartoes[i].bandeira == dadosCartao.bandeira) {
            if(BancoCartoes[i].titular == dadosCartao.titular) {
              if(BancoCartoes[i].vencimento == dadosCartao.vencimento) {
                const data = {
                  id_anuncio: dadosAnuncio._id,
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
                      navigation.navigate('Resumo reserva', { reserva: dadosReserva, cartao: dadosCartao, sucesso: true })
                    } else if(response?.data.success === false) {
                      navigation.goBack();
                    } else {
                      navigation.goBack();
                    }
                } catch (err) {
                    navigation.goBack();
                }
                break;
              }
            }
          }
        }
      } else {
        navigation.navigate('Resumo reserva', { reserva: dadosReserva, cartao: dadosCartao, sucesso: false })
      }
    }
  }
  if(isLoading === false) {
    return (
      <View style={styles.root}>
        <ScrollView overScrollMode='never'>
          <View>
            <View style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                    <Image style={styles.cardImage} source={{uri : `https://i.imgur.com/${dadosAnuncio.imagem}`}}></Image>
                    <View style={{maxWidth: '55%', justifyContent: 'center'}}>
                        <Text style={styles.thumbnailTitulo}>Você está reservando:</Text>
                        <Text style={styles.thumbnailSubtitulo}>{dadosAnuncio.titulo}</Text>
                        <Text style={styles.thumbnailEndereco}>{dadosAnuncio.logradouro}{dadosAnuncio.numero ? ", "+dadosAnuncio.numero : ""} - {dadosAnuncio.cidade}/{dadosAnuncio.estado}</Text>
                    </View>
                </View>
                <View style={styles.hr} />
                <View style={{marginTop: 20}}>
                  <Text style={styles.cardTitle}>Sua reserva</Text>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.textSubtitle}>Data</Text>
                      <Text style={styles.textMuted}>{dataReserva}</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => navigation.goBack()} background={TouchableNativeFeedback.Ripple('#CCCCCC', true, 26)}>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.textUnderlined}>Editar</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.textSubtitle}>Horário</Text>
                      <Text style={styles.textMuted}>{horaInicio}h às {horaFinal}h</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => navigation.goBack()} background={TouchableNativeFeedback.Ripple('#CCCCCC', true, 26)}>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.textUnderlined}>Editar</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
                <View style={styles.hr} />
                <View style={{marginTop: 20}}>
                  <Text style={styles.cardTitle}>Informações de preço</Text>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.textMuted}>{dadosAnuncio.preco},00 x {QtdHoras} Hora{QtdHoras === 1 ? "" : "s"}</Text>
                    </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.textMuted}>{ValorHoras},00</Text>
                      </View>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.textMuted}>Taxa de Serviço</Text>
                    </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.textMuted}>{TaxaServico},00</Text>
                      </View>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.textMutedTotal}>Total</Text>
                    </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.textMutedTotal}>{ValorTotal},00</Text>
                      </View>
                  </View>
                </View>
                <View style={styles.hr} />
                <View style={{marginTop: 20, marginBottom: 30}}>
                  <Text style={styles.cardTitle}>Pagamento</Text>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                    <View>
                      <Text style={styles.textSubtitle}>Cartão de Crédito</Text>
                      <Text style={styles.textMuted}>{dadosCartao.bandeira} **** {dadosCartao.numero.substring(15,19)} | {dadosCartao.parcelas === 1 ? 'À vista' : `${dadosCartao.parcelas}x sem juros`}</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => navigation.goBack()} background={TouchableNativeFeedback.Ripple('#CCCCCC', true, 26)}>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.textUnderlined}>Trocar</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View>
            <Button type='payment' title='Confirmar e pagar' onpress={() => AgendarReserva()} style={{ width: '40%' }}/>
          </View>
        </View>
      </View>
    )
    } else {
      return (
      <View style={styles.center}>
        <ActivityIndicator color={"#1a9946"} size={60} />
        <Text style={{color: '#1a9946', fontWeight: 'bold', fontSize: 18, padding: 20}}>Processando pagamento...</Text>
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
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    width: '45%',
    height: 160,
    borderRadius: 15
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  thumbnailTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  thumbnailSubtitulo: {
    fontSize: 19,
    fontWeight: '500',
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  thumbnailEndereco: {
    fontSize: 17,
    fontWeight: '400',
  },
  textUnderlined: {
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '100%',
    textDecorationLine: 'underline'
  },
  textSubtitle: {
    fontSize: 19,
    fontWeight: '500',
    maxWidth: '100%'
  },
  textMuted: {
    color: '#444444'
  },
  textMutedTotal: {
    color: '#444444',
    fontSize: 17,
    fontWeight: 'bold'
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

export default ConfirmarReserva;