import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../assets/components/button';
import api from '../assets/api/axios';

function Cadastrar({ navigation }) {
  const CADASTRO_URL = '/users/registrar';

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [contato, setContato] = useState('');
  const celRef = useRef(null);

  const Registrar = async () => {
    const contatoNoMask = celRef?.current.getRawValue();
    const data = {
      nome: nome,
      email: email,
      senha: senha,
      contato: contatoNoMask
    }
    try {
      const response = await api.post(CADASTRO_URL,JSON.stringify(data),
        {
          headers: {'Content-Type':'application/json'},
          withCredentials: true
        });
        if(response.data.success === true) {
          AsyncStorage.setItem('@TOKEN', response.data.result)
          navigation.goBack();
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
      <Text style={styles.registerh1}>Insira seus dados para finalizar o cadastro </Text>
      <View style={styles.container}>
        <TextInput placeholder='Nome' style={styles.inputText} value={nome} onChangeText={setNome}/>
        <TextInput placeholder='E-Mail' style={styles.inputText} value={email} onChangeText={setEmail}/>
        <TextInput placeholder='Senha' style={styles.inputText} value={senha} onChangeText={setSenha} secureTextEntry/>
        <TextInputMask placeholder='Celular' style={styles.inputContato} type={'cel-phone'} value={contato} ref={celRef} onChangeText={setContato}/>
        <Button title='Criar conta' onpress={Registrar} style={{ width: '100%' }}/>
        <Button title='Já possui conta? Faça login' onpress={() => navigation.goBack()} type='tertiary'/>
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
    registerh1: {
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: '10%'
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 15,
      marginTop: '5%'
    },
    label: {
      marginTop: 20
    },
    inputText: {
      width: '100%',
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10
    },
    inputContato: {
      width: '100%',
      marginTop: 5,
      marginBottom: 20,
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10
    }
  });

export default Cadastrar;