import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
  const { usuario, cargando } = useAuth();
  const { colores } = useTema();

  if (cargando) {
    return (
      <View style={[estilos.cargando, { backgroundColor: colores.fondoPrimario }]}>
        <ActivityIndicator size="large" color={colores.accentVerde} />
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
});

export default RootNavigator;
