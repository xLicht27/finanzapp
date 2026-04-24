import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Pila = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Pila.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
        <Pila.Screen name="Ingreso" component={LoginScreen} />
        <Pila.Screen name="Inicio" component={HomeScreen} />
        <Pila.Screen name="Perfil" component={ProfileScreen} />
        <Pila.Screen name="Registro" component={RegisterScreen} />
      </Pila.Navigator>
    </NavigationContainer>
  );
}
