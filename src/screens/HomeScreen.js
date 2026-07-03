import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import TransaccionItem from '../components/TransaccionItem';
import PresupuestoBadge from '../components/PresupuestoBadge';
import useTipoCambio from '../hooks/useTipoCambio';
import { obtenerEstilosGlobales } from '../styles/globales';
import { homeEstilos } from '../styles/HomeScreenEstilos';

const CLAVE_TRANSACCIONES = 'finanzaap_transacciones';

const transaccionesIniciales = [
  { id: '1', nombre: 'Almuerzo Ejecutivo', monto: -32.5, categoria: 'comida', fecha: 'Hoy, 14:30' },
  { id: '2', nombre: 'Cafetería Central', monto: -4.2, categoria: 'comida', fecha: 'Hoy, 09:11' },
  { id: '3', nombre: 'Uber Viaje', monto: -15.0, categoria: 'transporte', fecha: 'Ayer, 19:41' },
];

const HomeScreen = () => {
  const { usuario } = useAuth();
  const { colores, t } = useTema();
  const { tasa, cargando: cargandoApi, refrescar } = useTipoCambio('USD');
  const [transacciones, setTransacciones] = useState([]);
  const [refrescando, setRefrescando] = useState(false);
  const [colorSpinner, setColorSpinner] = useState('transparent');

  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = homeEstilos(colores);

  useEffect(() => {
    cargarTransacciones();
    const timer = setTimeout(() => {
      setColorSpinner(colores.accentVerde);
    }, 150);
    return () => clearTimeout(timer);
  }, [colores.accentVerde]);

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
      style={estilosComunes.fondoPrincipal}
      contentContainerStyle={estilosComunes.scroll}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refrescando}
          onRefresh={alRefrescar}
          tintColor={colorSpinner}
          colors={[colorSpinner]}
          progressBackgroundColor={colores.fondoTarjeta}
        />
      }
    >
      <Text style={[estilos.saludo, { color: colores.textoPrimario }]}>
        {t('hola')}, {usuario?.nombre?.split(' ')[0] || 'Usuario'} 👋
      </Text>

      <PresupuestoBadge
        presupuesto={presupuestoDiario}
        moneda="S/."
        cargando={cargandoApi}
      />

      {tasa && (
        <View style={[estilos.bannerApi, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
          <Text style={[estilos.textoBannerApi, { color: colores.accentVerde }]}>
            {t('tipoCambio')} {tasa?.toFixed(3)}
          </Text>
        </View>
      )}

      <View style={estilos.encabezadoSeccion}>
        <Text style={[estilosComunes.tituloItem, { fontSize: 16, fontWeight: '600' }]}>{t('actividadReciente')}</Text>
        <TouchableOpacity>
          <Text style={[estilos.verTodo, { color: colores.accentVerde }]}>{t('verTodo')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
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

export default HomeScreen;
