import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { COLORES } from '../constants/theme';

const RootNavigator = () => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={estilos.cargando}>
        <ActivityIndicator size="large" color={COLORES.accentVerde} />
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
    backgroundColor: COLORES.fondoPrimario,
  },
});

export default RootNavigator;
