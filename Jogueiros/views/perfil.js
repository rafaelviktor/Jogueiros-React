import React, { useState } from 'react';
import { StyleSheet, View, ScrollView , Text, TextInput } from 'react-native';
import Button from '../assets/components/button';

function Perfil() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = () => {
    alert(email+' '+senha)
  }

  const esqueceusenha = () => {
    alert(email+' '+senha)
  }

  return (
    <View style={styles.root}>
      <Text style={styles.loginh1}>Entre ou cadastre-se na plataforma Jogueiros.</Text>
      <Text style={styles.subtitle}>Aqui é possível anunciar seu espaço esportivo ou procurar por um local de sua preferência!</Text>
      <View style={styles.container}>
        <TextInput placeholder='E-Mail' style={styles.email} value={email} onChangeText={setEmail}/>
        <TextInput placeholder='Senha' style={styles.password} value={senha} onChangeText={setSenha} secureTextEntry/>
        <Button title='Entrar' onpress={login} style={{ width: '90%' }}/>
        <Button title='Não possui conta? Cadastre-se' onpress={esqueceusenha} type='tertiary'/>
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