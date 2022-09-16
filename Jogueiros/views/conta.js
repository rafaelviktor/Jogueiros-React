import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, ActivityIndicator } from 'react-native';
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
        <LinearGradient colors={['white', '#1a9946', '#1a9946', '#1a9946']} style={{flex: 1}}>
          <Text style={styles.loginh1}>Perfil</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.profileImage}>{perfilObj.nome.charAt(0)}</Text>
          </View>
          <View style={styles.profileBackground}>
            <View style={{flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <Text style={styles.loginh2}>Nome:</Text>
                <Text style={styles.subtitle}>{perfilObj.nome}</Text>
                <Text style={styles.loginh2}>E-Mail:</Text>
                <Text style={styles.subtitle}>{perfilObj.email}</Text>
                <Text style={styles.loginh2}>Contato:</Text>
                <Text style={styles.subtitle}>{perfilObj.contato}</Text>
              </View>
              <View>
                <Button title='Sair' type='danger' onpress={Sair}/>
              </View>
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
    loginh1: {
      marginTop: 30,
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
      marginTop: '5%'
    },
    label: {
      marginTop: 20
    },
    colspacing: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    profileBackground: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
    },
    profileImage: {
      width: 90,
      height: 90,
      borderWidth: 3,
      borderColor: 'white',
      borderRadius: 100,
      backgroundColor: '#1a9946',
      fontSize: 35,
      color: '#fff',
      textAlign: 'center',
      lineHeight: 90,
      margin: 20
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