import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../assets/components/button';
import api from '../assets/api/axios';

function Perfil({ navigation }) {
  const LOGIN_URL = '/users/entrar';
  const PERFIL_URL = '/perfil';
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfilObj, setPerfilObj] = useState({})

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get(PERFIL_URL,{
        headers: {'Content-Type':'application/json','token':`${token}`},
        withCredentials: true
      });
      if(response.data.success === true) {
        setPerfilObj(response.data.result)
        setIsAuthenticated(true)
      }
    } catch (err) {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getToken();
  },[])

  const Entrar = async () => {
    setIsLoading(true)
    const data = {
      email: email,
      senha: senha
    }
    try {
      const response = await api.post(LOGIN_URL,JSON.stringify(data),
        {
          headers: {'Content-Type':'application/json'},
          withCredentials: true
        });
        if(response.data.success === true) {
          Keyboard.dismiss();
          await AsyncStorage.setItem('token', response.data.result)
          setIsAuthenticated(true)
        } else if(response?.data.success === false) {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
    } catch (err) {
        alert(err.response.data.message)
    }
    await getToken();
    setIsLoading(false);
  }

  const Sair = async () => {
    try {
      await AsyncStorage.setItem('token', '')
      setIsAuthenticated(false)
    } catch (err) {
      
    }
  }

  if(isLoading === false) {
    return (
      <>
        {isAuthenticated ? (
        <>
        <LinearGradient colors={['#1a9946', '#40E0D0', '#40E0D0', '#40E0D0']} style={{flex: 1, marginTop: 25}}>
          <View style={{marginTop: 25, marginLeft: 15, marginBottom: 0}}>
            <Text style={styles.perfilh1}>Perfil</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.profileImage}>{perfilObj.nome.charAt(0)}</Text>
          </View>
          <View style={[styles.profileContainer, styles.profileContainerShadow]}>
            <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center'}}>
              <Text style={styles.loginh2}>{perfilObj.nome}</Text>
              <Text style={styles.subtitleemail}>{perfilObj.email}</Text>
            </View>
            <View style={{flex: 1, marginTop: 20, marginBottom: 20, backgroundColor: '#F8F8F8', paddingTop: 15, paddingBottom: 15, borderRadius: 15}}>
              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#cccccc', false, 200)} >
                <View style={{padding: 13, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                  <Text style={styles.subtitle}>Editar perfil</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#cccccc', false, 200)} >
                <View style={{padding: 13, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                  <Text style={styles.subtitle}>Meus anúncios</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#cccccc', false, 200)} >
                <View style={{padding: 13, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ccc'}}>
                  <Text style={styles.subtitle}>Minhas reservas</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <Button title='Sair' type='danger' onpress={Sair}/>
          </View>
        </LinearGradient>
        </>
        ) : (
        <View style={styles.root}>
          <View style={styles.colspacing}>
            <View>
              <Text style={styles.loginh1}>Entre ou cadastre-se na plataforma Jogueiros.</Text>
              <Text style={styles.subtitle}>Aqui é possível anunciar seu espaço esportivo ou procurar por um local de sua preferência!</Text>
            </View>
            <View style={styles.center}>
              <TextInput placeholder='E-Mail' style={styles.email} value={email} onChangeText={setEmail}/>
              <TextInput placeholder='Senha' style={styles.password} value={senha} onChangeText={setSenha} secureTextEntry/>
              <Button title='Entrar' onpress={Entrar} />
              <Button title='Não possui conta? Cadastre-se' onpress={() => navigation.navigate('Cadastrar')} type='tertiary'/>
            </View>
          </View>
        </View>
        )}
      </>
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
      flex: 1,
      margin: 15,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    perfilh1: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
    },
    loginh1: {
      fontWeight: 'bold',
      fontSize: 30,
    },
    loginh2: {
      fontWeight: 'bold',
      fontSize: 19,
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    subtitleemail: {
      fontSize: 15,
      color: '#6b6b6b',
      marginTop: 4,
      marginBottom: 4
    },
    label: {
      marginTop: 20
    },
    colspacing: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    profileContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      padding: 18,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15
    },
    profileContainerShadow: {
      shadowColor: '#171717',
      shadowOffset: {width: 8, height: 5},
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderWidth: 3,
      borderColor: 'white',
      borderRadius: 100,
      backgroundColor: '#1a9946',
      fontSize: 35,
      color: '#fff',
      textAlign: 'center',
      lineHeight: 100,
      margin: 15
    },
    email: {
      width: '100%',
      marginTop: 10,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10
    },
    password: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10
    }
  });

export default Perfil;