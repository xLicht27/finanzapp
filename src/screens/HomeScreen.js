import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import TransaccionItem from '../components/TransaccionItem';
import PresupuestoBadge from '../components/PresupuestoBadge';
import useTipoCambio from '../hooks/useTipoCambio';
import { COLORES } from '../constants/theme';

const CLAVE_TRANSACCIONES = 'finanzaap_transacciones';

const transaccionesIniciales = [
  { id: '1', nombre: 'Almuerzo Ejecutivo', monto: -32.5, categoria: 'comida', fecha: 'Hoy, 14:30' },
  { id: '2', nombre: 'Cafetería Central', monto: -4.2, categoria: 'comida', fecha: 'Hoy, 09:11' },
  { id: '3', nombre: 'Uber Viaje', monto: -15.0, categoria: 'transporte', fecha: 'Ayer, 19:41' },
];

const HomeScreen = () => {
  const { usuario } = useAuth();
  const { tasa, cargando: cargandoApi, refrescar } = useTipoCambio('USD');
  const [transacciones, setTransacciones] = useState([]);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    cargarTransacciones();
  }, []);

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

  const alRefrescar = async () => {
    setRefrescando(true);
    await refrescar();
    setRefrescando(false);
  };

  const presupuestoDiario = tasa ? (45 * tasa).toFixed(2) : null;

  return (
    <ScrollView
      style={estilos.fondoPrincipal}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refrescando}
          onRefresh={alRefrescar}
          tintColor={COLORES.accentVerde}
          colors={[COLORES.accentVerde]}
        />
      }
    >
      <Text style={estilos.saludo}>
        Hola, {usuario?.nombre?.split(' ')[0] || 'Usuario'} 👋
      </Text>

      <PresupuestoBadge
        presupuesto={presupuestoDiario}
        moneda="S/."
        cargando={cargandoApi}
      />

      {tasa && (
        <View style={estilos.bannerApi}>
          <Text style={estilos.textoBannerApi}>
            Tipo de cambio USD/PEN: S/. {tasa?.toFixed(3)}
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
