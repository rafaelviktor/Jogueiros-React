import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Anuncio from './views/anuncio';
import Reservar from './views/reservar';
import ConfirmarPagar from './views/confirmar-pagar';
import Cadastrar from './views/cadastrar';
import EditarPerfil from './views/editar-perfil';
import MeusAnuncios from './views/meus-anuncios';
import MinhasReservas from './views/minhas-reservas';
import Tabs from './navigation/tabs';

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
          <Stack.Screen name="Anúncio" component={Anuncio} />
          <Stack.Screen name="Agendar reserva" component={Reservar} />
          <Stack.Screen name="Confirmar e pagar" component={ConfirmarPagar} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="Editar perfil" component={EditarPerfil} />
          <Stack.Screen name="Meus anúncios" component={MeusAnuncios} />
          <Stack.Screen name="Minhas reservas" component={MinhasReservas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;