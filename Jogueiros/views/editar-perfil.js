import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../assets/components/button';
import api from '../assets/api/axios';

function EditarPerfil({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [contato, setContato] = useState('');
  const celRef = useRef(null);
  const [perfilId, setPerfilId] = useState({})

  const PERFIL_URL = '/perfil';
  
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get(PERFIL_URL,{
        headers: {'Content-Type':'application/json','token':`${token}`},
        withCredentials: true
      });
      if(response.data.success === true) {
        setPerfilId(response.data.result._id)
        setNome(response.data.result.nome)
        setEmail(response.data.result.email)
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  useEffect(() => {
    getToken();
  },[])

  const Alterar = async () => {
    const token = await AsyncStorage.getItem('token');
    const contatoNoMask = celRef?.current.getRawValue();
    const data = {
      nome: nome,
      email: email,
      senha: senha,
      contato: contatoNoMask
    }
    try {
      const EDITAR_URL = `/perfil/alterar/${perfilId}`;
      const response = await api.patch(EDITAR_URL,JSON.stringify(data),
        {
          headers: {'Content-Type':'application/json','token':`${token}`},
          withCredentials: true
        });
        if(response.data.success === true) {
          navigation.goBack();
          alert(response.data.message)
        } else if(response?.data.success === false) {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
    } catch (err) {
      alert(err.response.data.message)
      console.error(err)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.registerh1}>Dados da conta</Text>
      <Text style={styles.subtitle}>Informe abaixo as novas informações:</Text>
      <View style={styles.container}>
        <TextInput placeholder='Nome' style={styles.inputText} value={nome} onChangeText={setNome}/>
        <TextInput placeholder='E-Mail' style={styles.inputText} value={email} onChangeText={setEmail}/>
        <TextInput placeholder='Senha' style={styles.inputText} value={senha} onChangeText={setSenha} secureTextEntry/>
        <TextInputMask placeholder='Celular' style={styles.inputContato} type={'cel-phone'} value={contato} ref={celRef} onChangeText={setContato}/>
        <Button title='Salvar alterações' onpress={Alterar} style={{ width: '100%' }}/>
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

export default EditarPerfil;