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
import { useTema } from '../context/TemaContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CabeceraPrincipal = ({ navigation, colores }) => (
  <View style={[estilos.cabecera, { backgroundColor: colores.fondoPrimario, borderBottomColor: colores.borde }]}>
    <Image
      source={require('../../assets/logo.png')}
      style={estilos.logo}
      resizeMode="contain"
    />
    <TouchableOpacity onPress={() => navigation.navigate('Ajustes')} style={estilos.botonAjustes}>
      <Ionicons name="settings-outline" size={22} color={colores.textoSecundario} />
    </TouchableOpacity>
  </View>
);

const TabNavigator = () => {
  const { colores } = useTema();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: () => <CabeceraPrincipal navigation={navigation} colores={colores} />,
        tabBarStyle: [estilos.barraTab, { backgroundColor: colores.fondoTarjeta, borderTopColor: colores.borde }],
        tabBarActiveTintColor: colores.accentVerde,
        tabBarInactiveTintColor: colores.textoSecundario,
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
};

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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  logo: {
    width: 34,
    height: 34,
  },
  botonAjustes: {
    padding: 4,
  },
  barraTab: {
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
