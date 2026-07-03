import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ReportesScreen from '../screens/ReportesScreen';
import ServiciosScreen from '../screens/ServiciosScreen';
import AjustesScreen from '../screens/AjustesScreen';
import AjustesPrivacidadScreen from '../screens/AjustesPrivacidadScreen';
import AjustesNotificacionesScreen from '../screens/AjustesNotificacionesScreen';
import AjustesAccesibilidadScreen from '../screens/AjustesAccesibilidadScreen';
import AjustesEliminarCuentaScreen from '../screens/AjustesEliminarCuentaScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORES } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CabeceraPrincipal = ({ navigation, titulo }) => (
  <View style={estilos.cabecera}>
    <Image
      source={require('../../assets/logo.png')}
      style={estilos.logo}
      resizeMode="contain"
    />
    <TouchableOpacity onPress={() => navigation.navigate('Ajustes')} style={estilos.botonAjustes}>
      <Ionicons name="settings-outline" size={22} color={COLORES.textoSecundario} />
    </TouchableOpacity>
  </View>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      header: () => <CabeceraPrincipal navigation={navigation} titulo={route.name} />,
      tabBarStyle: estilos.barraTab,
      tabBarActiveTintColor: COLORES.accentVerde,
      tabBarInactiveTintColor: COLORES.textoSecundario,
      tabBarLabelStyle: estilos.etiquetaTab,
      tabBarIcon: ({ color, size }) => {
        const iconos = {
          Inicio: 'home-outline',
          Reportes: 'bar-chart-outline',
          Servicios: 'grid-outline',
        };
        return <Ionicons name={iconos[route.name]} size={22} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Inicio" component={HomeScreen} />
    <Tab.Screen name="Reportes" component={ReportesScreen} />
    <Tab.Screen name="Servicios" component={ServiciosScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Principal" component={TabNavigator} />
    <Stack.Screen name="Ajustes" component={AjustesScreen} />
    <Stack.Screen name="EditarPerfil" component={ProfileScreen} />
    <Stack.Screen name="AjustesPrivacidad" component={AjustesPrivacidadScreen} />
    <Stack.Screen name="AjustesNotificaciones" component={AjustesNotificacionesScreen} />
    <Stack.Screen name="AjustesAccesibilidad" component={AjustesAccesibilidadScreen} />
    <Stack.Screen name="AjustesEliminarCuenta" component={AjustesEliminarCuentaScreen} />
  </Stack.Navigator>
);

const estilos = StyleSheet.create({
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORES.fondoPrimario,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },
  logo: {
    width: 34,
    height: 34,
  },
  botonAjustes: {
    padding: 4,
  },
  barraTab: {
    backgroundColor: COLORES.fondoTarjeta,
    borderTopColor: COLORES.borde,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  etiquetaTab: {
    fontSize: 11,
  },
});

export default AppNavigator;
