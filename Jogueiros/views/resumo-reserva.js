import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, BackHandler, ActivityIndicator } from 'react-native';
import Button from '../assets/components/button';
import logo from '../assets/jogueiros-logo.png';

function ResumoReserva({ route, navigation }) {
    const dadosReserva = route.params.reserva;
    const dadosCartao = route.params.cartao;
    const sucesso = route.params.sucesso;

    setTimeout(() => {
      console.log(sucesso);
      setIsLoading(false)
    }, 3000)

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const backAction = () => {
          navigation.popToTop()
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    if(isLoading === false) {
      if(sucesso === true) {
        return (
          <View style={styles.root}>
            <View style={styles.header}>
              <Image style={styles.logoImage} source={logo}></Image>
            </View>
            <Text style={styles.pageTitle}>Reserva efetuada com sucesso</Text>
            <ScrollView style={{paddingBottom: 12}} overScrollMode='never' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.cardTitle}>Detalhes da transação</Text>
                        <View style={styles.hr} />
                            <View style={styles.containerDetails}>
                                <Text style={styles.cardTitle}>Autenticação: {Math.random().toString(36).slice(2)}</Text>
                                <Text style={styles.cardTitle}>Valor Final: {dadosReserva.valor},00</Text>
                                <Text style={styles.cardTitle}>Número de Parcelas: {'2'}</Text>
                                <Text style={styles.cardTitle}>Cartão: {dadosCartao.numero.substring(0,2)}** **** **** {dadosCartao.numero.substring(15,19)}</Text>
                                <Text style={styles.cardTitle}>Bandeira: {dadosCartao.bandeira}</Text>
                            </View>
                        <View style={styles.hr} />
                    </View>
                </View>
              </ScrollView>
            <View style={styles.footer}>
              <View>
                <Button title='Voltar ao início' onpress={() => navigation.popToTop()} style={{ width: '40%' }}/>
              </View>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.root}>
            <View style={styles.header}>
              <Image style={styles.logoImage} source={logo}></Image>
            </View>
            <Text style={styles.pageBadTitle}>Não foi possível finalizar sua reserva</Text>
            <ScrollView style={{paddingBottom: 12}} overScrollMode='never' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.cardTitle}>Motivo da falha</Text>
                        <View style={styles.hr} />
                            <View style={styles.containerDetails}>
                                <Text style={styles.cardTitle}>A compra não foi autorizada pela administradora do cartão.</Text>
                            </View>
                            <View style={styles.hr} />
                            <View style={styles.containerDetails}>
                                <Text style={styles.cardTitle}>Valor Final: {dadosReserva.valor},00</Text>
                                <Text style={styles.cardTitle}>Número de Parcelas: {'2'}</Text>
                                <Text style={styles.cardTitle}>Cartão: {dadosCartao.numero.substring(0,2)}** **** **** {dadosCartao.numero.substring(15,19)}</Text>
                                <Text style={styles.cardTitle}>Bandeira: {dadosCartao.bandeira}</Text>
                            </View>
                        <View style={styles.hr} />
                    </View>
                </View>
              </ScrollView>
            <View style={styles.footer}>
              <View style={{marginBottom: 12}}>
                <Button title='Alterar dados da reserva' onpress={() => navigation.goBack()}/>
              </View>
              <View>
                <Button type='muted' title='Voltar ao início e cancelar' onpress={() => navigation.popToTop()} />
              </View>
            </View>
          </View>
          )
      }
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
  header: {
    marginTop: 28,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9'
  },
  containerDetails: {
    margin: 10
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
  pageTitle: {
    margin: 10,
    marginBottom: 0,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#1a9946',
    color: '#FFF',
    borderRadius: 10,
    padding: 7,
    fontWeight: 'bold'
  },
  pageBadTitle: {
    margin: 10,
    marginBottom: 0,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#DC3545',
    color: '#FFF',
    borderRadius: 10,
    padding: 7,
    fontWeight: 'bold'
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center'
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
    paddingBottom: 10
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    padding: 13
  }
});

export default ResumoReserva;