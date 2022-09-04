import * as React from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

function HomeExplorar() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Algum local de preferência?' style={styles.inputpesquisa} />
    </View>
  );
}

function PerfilLogin() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.loginh1}>Entre ou cadastre-se no Jogueiros.com</Text>
      <TextInput placeholder='Número de telefone' style={styles.input}/>
      <Text style={styles.label}>Não iremos entrar em contato, é apenas para verificar se você já possui login.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Explorar" component={HomeExplorar} />
        <Tab.Screen name="Perfil" component={PerfilLogin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30
  },
  loginh1: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 30
  },
  label: {
    marginTop: 10
  },
  input: {
    marginTop: 40,
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 10
  },
  inputpesquisa: {
    marginTop: 40,
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center'
  }
});

export default App;