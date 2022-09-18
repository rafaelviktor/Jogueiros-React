import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Cadastrar from './views/cadastrar'
import EditarPerfil from './views/editar-perfil'
import Tabs from './navigation/tabs'

const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Tabs />
  );
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="Editar perfil" component={EditarPerfil} />
          <Stack.Screen name="Meus anúncios" component={Cadastrar} />
          <Stack.Screen name="Minhas reservas" component={Cadastrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;