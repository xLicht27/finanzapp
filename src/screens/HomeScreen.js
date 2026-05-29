import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import TransaccionItem from '../components/TransaccionItem';
import PresupuestoBadge from '../components/PresupuestoBadge';
import { COLORES } from '../constants/theme';

const CLAVE_TRANSACCIONES = 'finanzaap_transacciones';

const transaccionesIniciales = [
  { id: '1', nombre: 'Almuerzo Ejecutivo', monto: -32.5, categoria: 'comida', fecha: 'Hoy, 14:30' },
  { id: '2', nombre: 'Cafetería Central', monto: -4.2, categoria: 'comida', fecha: 'Hoy, 09:11' },
  { id: '3', nombre: 'Uber Viaje', monto: -15.0, categoria: 'transporte', fecha: 'Ayer, 19:41' },
];

const HomeScreen = () => {
  const { usuario } = useAuth();
  const [tipoCambio, setTipoCambio] = useState(null);
  const [cargandoApi, setCargandoApi] = useState(true);
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    obtenerTipoCambio();
    cargarTransacciones();
  }, []);

  const obtenerTipoCambio = async () => {
    try {
      const respuesta = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const datos = await respuesta.json();
      setTipoCambio(datos.rates.PEN);
    } catch (error) {
      setTipoCambio(3.7);
    } finally {
      setCargandoApi(false);
    }
  };

  const cargarTransacciones = async () => {
    try {
      const guardadas = await AsyncStorage.getItem(CLAVE_TRANSACCIONES);
      if (guardadas) {
        setTransacciones(JSON.parse(guardadas));
      } else {
        await AsyncStorage.setItem(CLAVE_TRANSACCIONES, JSON.stringify(transaccionesIniciales));
        setTransacciones(transaccionesIniciales);
      }
    } catch (error) {
      setTransacciones(transaccionesIniciales);
    }
  };

  const presupuestoDiario = tipoCambio ? (45 * tipoCambio).toFixed(2) : null;

  return (
    <ScrollView
      style={estilos.fondoPrincipal}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <Text style={estilos.saludo}>
        Hola, {usuario?.nombre?.split(' ')[0] || 'Usuario'} 👋
      </Text>

      <PresupuestoBadge
        presupuesto={presupuestoDiario}
        moneda="S/."
        cargando={cargandoApi}
      />

      {tipoCambio && (
        <View style={estilos.bannerApi}>
          <Text style={estilos.textoBannerApi}>
            Tipo de cambio USD/PEN: S/. {tipoCambio?.toFixed(3)}
          </Text>
        </View>
      )}

      <View style={estilos.encabezadoSeccion}>
        <Text style={estilos.tituloSeccion}>Actividad Reciente</Text>
        <TouchableOpacity>
          <Text style={estilos.verTodo}>Ver todo</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.tarjeta}>
        {transacciones.map((item) => (
          <TransaccionItem
            key={item.id}
            nombre={item.nombre}
            monto={item.monto}
            categoria={item.categoria}
            fecha={item.fecha}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
    backgroundColor: COLORES.fondoPrimario,
  },
  scroll: {
    padding: 20,
    paddingBottom: 30,
  },
  saludo: {
    color: COLORES.textoPrimario,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  bannerApi: {
    backgroundColor: COLORES.accentVerdeTenue,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORES.accentVerde,
    alignItems: 'center',
  },
  textoBannerApi: {
    color: COLORES.accentVerde,
    fontSize: 12,
    fontWeight: '500',
  },
  encabezadoSeccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tituloSeccion: {
    color: COLORES.textoPrimario,
    fontSize: 16,
    fontWeight: '600',
  },
  verTodo: {
    color: COLORES.accentVerde,
    fontSize: 13,
  },
  tarjeta: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
});

export default HomeScreen;
