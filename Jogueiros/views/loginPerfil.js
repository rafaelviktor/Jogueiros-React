import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../assets/components/button';
import api from '../assets/api/axios';

function Perfil({ navigation }) {
  const LOGIN_URL = '/users/entrar';
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
   const accessToken = AsyncStorage.getItem('token');
  },[])

  const Entrar = async () => {
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
          await AsyncStorage.setItem('token', response.data.result)
          alert(response.data.message)
        } else if(response?.data.success === false) {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
    } catch (err) {
        alert(err.message)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.loginh1}>Entre ou cadastre-se na plataforma Jogueiros.</Text>
      <Text style={styles.subtitle}>Aqui é possível anunciar seu espaço esportivo ou procurar por um local de sua preferência!</Text>
      <View style={styles.container}>
        <TextInput placeholder='E-Mail' style={styles.email} value={email} onChangeText={setEmail}/>
        <TextInput placeholder='Senha' style={styles.password} value={senha} onChangeText={setSenha} secureTextEntry/>
        <Button title='Entrar' onpress={Entrar} style={{ width: '90%' }}/>
        <Button title='Não possui conta? Cadastre-se' onpress={() => navigation.navigate('Cadastrar')} type='tertiary'/>
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      marginLeft: 15,
      marginRight: 15
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginh1: {
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: '18%'
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 15,
      marginTop: '5%'
    },
    label: {
      marginTop: 20
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