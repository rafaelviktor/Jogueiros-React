import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView , Text, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../assets/components/button';

function Cadastrar({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [contato, setContato] = useState('');
  const celRef = useRef(null);

  const login = () => {
    const contatoNoMask = celRef?.current.getRawValue();
    alert(contatoNoMask)
  }

  return (
    <View style={styles.root}>
      <Text style={styles.registerh1}>Insira seus dados para finalizar o cadastro </Text>
      <View style={styles.container}>
        <TextInput placeholder='Nome' style={styles.inputText} value={nome} onChangeText={setNome}/>
        <TextInput placeholder='E-Mail' style={styles.inputText} value={email} onChangeText={setEmail}/>
        <TextInput placeholder='Senha' style={styles.inputText} value={senha} onChangeText={setSenha} secureTextEntry/>
        <TextInputMask placeholder='Celular' style={styles.inputContato} type={'cel-phone'} value={contato} ref={celRef} onChangeText={setContato}/>
        <Button title='Criar conta' onpress={login} style={{ width: '100%' }}/>
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