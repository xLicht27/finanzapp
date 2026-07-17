import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

/**
 * Navegador Raíz que decide si mostrar el flujo de autenticación,
 * el flujo principal de la aplicación, o la pantalla de bloqueo biométrico.
 */
const RootNavigator = () => {
  const { usuario, cargando, biometriaActiva } = useAuth();
  const { colores } = useTema();
  const [bloqueado, setBloqueado] = useState(true);

  useEffect(() => {
    if (usuario && biometriaActiva) {
      solicitarDesbloqueo();
    }
  }, [usuario, biometriaActiva]);

  /**
   * Dispara el diálogo de autenticación biométrica del sistema.
   * Si es exitoso, desbloquea la pantalla para permitir el acceso.
   */
  const solicitarDesbloqueo = async () => {
    try {
      const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Acceso seguro a FinanZaap',
        cancelLabel: 'Salir',
        disableDeviceFallback: false,
      });

      if (resultado.success) {
        setBloqueado(false);
      }
    } catch (e) {
    }
  };

  if (cargando) {
    return (
      <View style={[estilos.cargando, { backgroundColor: colores.fondoPrimario }]}>
        <ActivityIndicator size="large" color={colores.accentVerde} />
      </View>
    );
  }

  if (usuario && biometriaActiva && bloqueado) {
    return (
      <View style={[estilos.cargando, { backgroundColor: colores.fondoPrimario, padding: 30 }]}>
        <Ionicons name="lock-closed" size={64} color={colores.accentVerde} style={estilos.candadoIcono} />
        <Text style={[estilos.tituloBloqueo, { color: colores.textoPrimario }]}>
          FinanZaap Bloqueado
        </Text>
        <Text style={[estilos.descripcionBloqueo, { color: colores.textoSecundario }]}>
          Confirma tu identidad biométrica para acceder a tu información financiera.
        </Text>
        <TouchableOpacity
          style={[estilos.botonDesbloquear, { backgroundColor: colores.accentVerde }]}
          onPress={solicitarDesbloqueo}
        >
          <Ionicons name="finger-print" size={20} color={colores.fondoPrimario} />
          <Text style={[estilos.textoBoton, { color: colores.fondoPrimario }]}>
            Desbloquear App
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return usuario ? <AppNavigator /> : <AuthNavigator />;
};

const estilos = StyleSheet.create({
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candadoIcono: {
    marginBottom: 20,
  },
  tituloBloqueo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  descripcionBloqueo: {
    fontSize: 13,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 18,
  },
  botonDesbloquear: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textoBoton: {
    fontWeight: '700',
    fontSize: 14,
  },
});

export default RootNavigator;
